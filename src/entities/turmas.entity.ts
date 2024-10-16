import { EntidadeBase } from "entities/entidadeBase.entity";
import { Column, Entity } from "typeorm";

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
export class Turmas extends EntidadeBase {
  @Column({
    type: 'enum',
    enum: AnoLetivo
  })
  anoLetivo: AnoLetivo

  @Column({
    type: 'enum',
    enum: PeriodoLetivo
  })
  periodoLetivo: PeriodoLetivo

  @Column({
    type: 'enum',
    enum: TipoEnsino
  })
  ensino: TipoEnsino

  @Column({ 
    unique: true,
    type: 'text'
  })
  turmaApelido: string;
}