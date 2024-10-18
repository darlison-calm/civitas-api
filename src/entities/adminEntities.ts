import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Membros } from './membrosEntities';
import { compararSenha, criptografarSenha } from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  apelido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @ManyToOne(() => Membros, { eager: true })
  @JoinColumn({ name: 'membroId' })
  membro: Membros;

  @BeforeInsert()
  @BeforeUpdate()
  async handleCriptografiaSenha(): Promise<void> {
    // Evita recriptografar senhas que já foram criptografadas
    if (this.senha && this.isSenhaPlainText()) {
      this.senha = await criptografarSenha(this.senha);
    }
  }

  // Verifica se a senha ainda está em texto plano
  private isSenhaPlainText(): boolean {
    return !this.senha.startsWith('$2b$'); // Hash bcrypt começa com $2b$
  }

  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }
}
