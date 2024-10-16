import {
  Entity,
  Column,
} from 'typeorm';

import { BaseEntity, TipoConta } from './baseEntity';

@Entity()
export class Membros extends BaseEntity {
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
