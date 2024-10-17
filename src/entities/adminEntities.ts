import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Membros } from './membrosEntities';
import {
  CriptografarSenhaAntesDeInserir,
  compararSenha,
  criptografarSenha
} from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  /**
   * Apelido único para o administrador.
   * @type {string}
   */
  @Column({ unique: true })
  apelido: string;

  /**
   * Endereço de e-mail único do membro.
   * @type {string}
   * @unique
   */
  @Column({ unique: true })
  email: string;

  /**
   * Senha do administrador (criptografada).
   * @type {string}
   */
  @Column()
  senha: string;

  /**
   * Relacionamento com o membro associado.
   * @type {Membros}
   */
  @ManyToOne(() => Membros, { eager: true })
  @JoinColumn({ name: 'membroId' })
  membro: Membros;

  /**
   * Criptografa a senha do administrador antes de inserir ou atualizar.
   * A lógica está no decorator CriptografarSenhaAntesDeInserir.
   */
  @CriptografarSenhaAntesDeInserir()
  async criptografarSenha() {
    // Implementado no decorator
  }

  /**
   * Compara a senha fornecida com a senha criptografada.
   * @param senhaPlana
   * @returns {Promise<boolean>}
   */
  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }

  /**
   * Criptografa a senha antes de inserir ou atualizar no banco de dados.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async handleCriptografiaSenha(): Promise<void> {
    this.senha = await criptografarSenha(this.senha);
  }
}
