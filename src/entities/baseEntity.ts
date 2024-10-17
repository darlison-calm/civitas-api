import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

/**
 * Enumeração para definir os diferentes tipos de contas de usuários.
 */
export enum TipoConta {
  /**
   * Conta de administrador.
   */
  ADMIN = 'admin',

  /**
   * Conta de professor.
   */
  PROFESSOR = 'professor',

  /**
   * Conta de aluno.
   */
  ALUNO = 'aluno',

  /**
   * Conta de responsável.
   */
  RESPONSAVEL = 'responsavel'
}

/**
 * Entidade base abstrata que contém campos comuns a todas as entidades.
 * Inclui campos de auditoria como `dataCriacao` e `dataAtualizacao`.
 */
export abstract class BaseEntity {
  /**
   * Chave primária gerada automaticamente para cada entidade.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Data de criação do registro.
   * Definida automaticamente ao inserir um novo registro.
   * @type {Date}
   */
  @Column()
  dataCriacao: Date;

  /**
   * Data de atualização do registro.
   * Definida automaticamente ao atualizar um registro.
   * @type {Date}
   */
  @Column()
  dataAtualizacao: Date;

  /**
   * Define a data de criação do registro.
   * Este método é chamado automaticamente antes de um registro ser inserido no banco de dados.
   * @internal
   * @returns {void}
   */
  @BeforeInsert()
  setDataCriacao(): void {
    this.dataCriacao = new Date();
  }

  /**
   * Define a data de atualização do registro.
   * Este método é chamado automaticamente antes de um registro ser atualizado no banco de dados.
   * @internal
   * @returns {void}
   */
  @BeforeUpdate()
  setDataAtualizacao(): void {
    this.dataAtualizacao = new Date();
  }
}
