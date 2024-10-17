import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity, TipoConta } from './baseEntity';
import {
  CriptografarSenhaAntesDeInserir,
  compararSenha,
  criptografarSenha
} from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  apelido: string;

  @Column({ type: 'enum', enum: TipoConta })
  tipoConta: TipoConta;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @CriptografarSenhaAntesDeInserir()
  async criptografarSenha() {
    // A lógica de criptografia está no decorator
  }

  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async handleCriptografiaSenha() {
    this.senha = await criptografarSenha(this.senha);
  }
}
