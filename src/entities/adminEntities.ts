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

  /**
   * Verifica se a senha esá em formato de texto puro e, caso esteja,
   * a criptografa usando o algoritmo bcrypt.
   */
  async handleCriptografiaSenha(): Promise<void> {
    // Evita recriptografar senhas que já foram criptografadas
    if (this.senha && this.isSenhaPlainText()) {
      this.senha = await criptografarSenha(this.senha);
    }
  }

  /**
   * Faz uma verifica o simples se a senha come a com o prefixo do hash bcrypt ($2b$).
   * @returns true se a senha for em formato de texto puro, false caso contrário.
   */
  private isSenhaPlainText(): boolean {
    return !this.senha.startsWith('$2b$'); // Hash bcrypt começa com $2b$
  }

  /**
   * Compara uma senha fornecida com a senha do administrador.
   * @param senhaPlana - A senha em formato de texto puro fornecida pelo usuário.
   * @returns true se as senhas correspondem, false caso contrário.
   */
  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }
}
