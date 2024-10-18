// src/entities/Aluno.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('alunos')
export class Aluno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeCompleto: string;

    @Column()
    rg: string;

    @Column()
    numeroMatricula: string;

    @Column()
    turma: string;

    @Column()
    cpfResponsavel: string;

    @Column()
    administradorId: number; 
}
