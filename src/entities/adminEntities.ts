import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

import { BaseEntity, TipoConta } from './baseEntity';
import { CriptografarSenhaAntesDeInserir, compararSenha } from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  apelido: string;

  @Column()
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
}