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
    setDataCriacao() {
        this.dataCriacao = new Date();
    }

    @BeforeUpdate()
    setDataAtualizacao() {
        this.dataAtualizacao = new Date();
    }
}