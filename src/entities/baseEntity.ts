import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

export enum TipoConta {
  ADMIN = 'admin',
  PROFESSOR = 'professor',
  ALUNO = 'aluno',
  RESPONSAVEL = 'responsavel'
}

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dataCriacao: Date;

  @Column()
  dataAtualizacao: Date;

  @BeforeInsert()
  setDataCriacao(): void {
    this.dataCriacao = new Date();
  }

  @BeforeUpdate()
  setDataAtualizacao(): void {
    this.dataAtualizacao = new Date();
  }
}
