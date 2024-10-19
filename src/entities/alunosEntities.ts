import { Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Turma } from './turmasEntities';
import { Membros } from './membrosEntities';
import { Responsaveis } from './responsaveisEntities';
/**
 * Entidade que representa um Aluno no sistema.
 * Um aluno está associado a um membro (OneToOne),
 * um admin (ManyToOne), e um responsável (ManyToOne).
 */
@Entity('alunos')
export class Alunos extends BaseEntity {
    /**
   * Relacionamento OneToOne com a entidade Membros.
   * Cada aluno tem um membro associado que armazena suas informações gerais.
   */
  @OneToOne(() => Membros, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({name: 'membroId'})
  membro: Membros;
  
  /**
   * Relacionamento ManyToOne com a entidade Membros (Admin).
   * Muitos alunos podem estar associados ao mesmo administrador.
   */
  @ManyToOne(() => Membros, { eager: true })
  @JoinColumn({ name: 'adminId' })
  admin: Membros;


  /**
 * Relacionamento ManyToOne com a entidade Turma.
 * 
 * Muitos alunos podem estar associados à mesma turma.
 * O campo `turma` pode ser nulo, indicando que um aluno pode não 
 * estar associado a uma turma específica.
 * 
 * @type {Turma | null} turma - A turma associada ao aluno, que pode ser nula.
 */
  @ManyToOne(() => Turma, (turma) => turma.alunos)
  @JoinColumn({ name: 'turmaId' })
  turma: Turma | null;

  /**
   * Relacionamento ManyToOne com a entidade Responsaveis.
   * Cada aluno tem exatamente um responsável.
   */
  @ManyToOne(() => Responsaveis, { eager: true })
  @JoinColumn({ name: 'responsavelId' })
  responsavel: Responsaveis;
}

