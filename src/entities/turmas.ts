import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum AnoLetivo {
  ANO_1 = '1º ano',
  ANO_2 = '2º ano',
  ANO_3 = '3º ano',
  ANO_4 = '4º ano',
  ANO_5 = '5º ano',
  ANO_6 = '6º ano'
}

export enum PeriodoLetivo {
  MANHA = 'Manhã',
  TARDE = 'Tarde',
  NOITE = 'Noite'
}

export enum TipoEnsino {
  MATERNAL = 'Maternal',
  PRE_ESCOLA = 'Pré-escola',
  ENSINO_FUNDAMENTAL_1 = 'Ensino fundamental 1'
}

@Entity('turmas')
export class Turmas {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'ano_letivo',
    type: 'enum',
    enum: AnoLetivo
  })
  anoLetivo: AnoLetivo

  @Column({
    name: 'periodo_letivo',
    type: 'enum',
    enum: PeriodoLetivo
  })
  periodoLetivo: PeriodoLetivo

  @Column({
    name: 'ensino',
    type: 'enum',
    enum: TipoEnsino
  })
  ensino: TipoEnsino


  @Column({ 
    name: 'turma_apelido',
    unique: true,
    type: 'text'
  })
  turmaApelido: string;

  @CreateDateColumn({name: 'data_criacao'})
  dataCriacao: Date;

  @UpdateDateColumn({name: 'data_atualizacao'})
  dataAtualizacao: Date;
}


