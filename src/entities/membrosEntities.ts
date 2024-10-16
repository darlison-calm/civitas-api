import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class Membros {
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
    senha: string;

    @Column({ unique: true })
    email: string;

    @Column()
    tipoConta: 'admin' | 'professor' | 'aluno' | 'responsavel';

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
