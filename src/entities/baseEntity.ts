import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

/**
 * Enumeração que define os tipos de contas disponíveis.
 */
export enum TipoConta {
  ADMIN = 'admin',
  PROFESSOR = 'professor',
  ALUNO = 'aluno',
  RESPONSAVEL = 'responsavel'
}

/**
 * Classe abstrata que define campos e comportamentos comuns para todas as entidades.
 */
export abstract class BaseEntity {
  /**
   * Identificador único da entidade.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Data de criação do registro. Define automaticamente o timestamp na inserção.
   * @type {Date}
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  /**
   * Data de atualização do registro. Atualiza automaticamente o timestamp nas modificações.
   * @type {Date}
   */
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  dataAtualizacao: Date;

  /**
   * Define a data de criação antes de inserir um novo registro no banco de dados.
   */
  @BeforeInsert()
  setDataCriacao(): void {
    this.dataCriacao = new Date();
  }

  /**
   * Define a data de atualização antes de modificar um registro no banco de dados.
   */
  @BeforeUpdate()
  setDataAtualizacao(): void {
    this.dataAtualizacao = new Date();
  }
}
