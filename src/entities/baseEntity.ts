import {
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';

export type TipoConta = 'admin' | 'professor' | 'aluno' | 'responsavel';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dataCriacao: Date;

    @Column()
    dataAtualizacao: Date;

    @BeforeInsert()
    /**
     * Define a data de criacao do registro.
     * Chamada automaticamente antes de inserir um registro no banco de dados.
     * @internal
     * @returns {void}
     */
    setDataCriacao() {
        this.dataCriacao = new Date();
    }

    @BeforeUpdate()
    /**
     * Define a data de atualizacao do registro.
     * Chamada automaticamente antes de atualizar um registro no banco de dados.
     * @internal
     * @returns {void}
     */
    setDataAtualizacao() {
        this.dataAtualizacao = new Date();
    }
}