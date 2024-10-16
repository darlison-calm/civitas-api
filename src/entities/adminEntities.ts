import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { Membros } from "./membrosEntities";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nickname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @ManyToOne(() => Membros, Membros => Membros.tipoConta === 'admin')
    membros: Membros;

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