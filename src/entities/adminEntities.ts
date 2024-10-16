import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert
} from 'typeorm';

import { BaseEntity, TipoConta } from './baseEntity'; 

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  senha: string;

  @Column()
  tipoConta: TipoConta;
}