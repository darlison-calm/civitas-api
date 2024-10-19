import { Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Turma } from './turmasEntities';
import { Membros } from './membrosEntities';

@Entity('alunos')
export class Aluno extends BaseEntity {
  @OneToOne(() => Membros, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  membro: Membros;

  @ManyToOne(() => Turma, (turma) => turma.alunos)
  @JoinColumn({ name: 'turmaId' })
  turma: Turma | null;
}
