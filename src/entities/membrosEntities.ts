import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

import { BaseEntity, TipoConta } from './baseEntity';

@Entity()
export class Membros extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numeroMatricula: string;

  @Column()
  nomeCompleto: string;

  @Column()
  dataNascimento: Date;

  @Column({ unique: true })
  rg: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  tipoConta: TipoConta;
}
