import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TipoConta {
  FREE = 'free',
  PREMIUM = 'premium'
}

@Entity('membros')
export class Membro {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    unique: true,
    length: 20,
    nullable: true
  })
  numeroMatricula: string

  @Column({
    type: 'varchar',
    length: 50
  })
  nomeCompleto: string

  @Column()
  dataNascimento: Date

  @Column({
    type: 'varchar',
    unique: true,
    length: 20,
  })
  rg: string
  
  @Column({
    type: 'varchar',
    unique: true,
    length: 14
  })
  cpf: string

  @Column({
    type: 'enum',
    enum: TipoConta
  })
  tipoConta: TipoConta

  @CreateDateColumn()
  dataCriacao: Date

  @UpdateDateColumn()
  dataAtualizacao: Date
}

