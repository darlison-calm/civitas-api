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
import {
  CriptografarSenhaAntesDeInserir,
  compararSenha,
  criptografarSenha
} from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  apelido: string;

  @Column()
  senha: string;

  @ManyToOne(() => Membros, { eager: true })
  @JoinColumn({ name: 'membroId' })
  membro: Membros;

  @CriptografarSenhaAntesDeInserir()
  async criptografarSenha() {
    // A lógica de criptografia está implementada no decorator CriptografarSenhaAntesDeInserir.
  }

  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async handleCriptografiaSenha(): Promise<void> {
    this.senha = await criptografarSenha(this.senha);
  }
}
