import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert
} from 'typeorm'

import { BaseEntity, TipoConta } from './baseEntity'

import * as bcrypt from 'bcrypt'

@Entity()
export class Admin extends BaseEntity {
  @Column({ unique: true })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }

  @Column()
  tipoConta: TipoConta;
}