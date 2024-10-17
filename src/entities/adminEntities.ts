import {
  Entity,
  Column,
} from 'typeorm';

import { BaseEntity, TipoConta } from './baseEntity';
import { CriptografarSenhaAntesDeInserir, compararSenha } from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  apelido: string;

  @Column()
  tipoConta: TipoConta;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @CriptografarSenhaAntesDeInserir()
/**
 * Função assíncrona para criptografar a senha antes de inserir um registro no banco de dados.
 */
  async criptografarSenha() {
    // A lógica de criptografia está no decorator
  }

/**
 * Compara a senha em texto plano com a senha criptografada.
 * @param senhaPlana
 * @returns
 */
  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }
}