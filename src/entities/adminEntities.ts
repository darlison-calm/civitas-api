import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './baseEntity';
import {
  CriptografarSenhaAntesDeInserir,
  compararSenha,
  criptografarSenha
} from '../utils/senhaUtils';

@Entity()
export class Admin extends BaseEntity {
  /**
   * Apelido único utilizado pelo administrador.
   * @type {string}
   * @unique
   */
  @Column({ unique: true })
  apelido: string;

  /**
   * Senha criptografada do administrador.
   * @type {string}
   */
  @Column()
  senha: string;

  /**
   * Decorator personalizado que aplica a criptografia da senha antes de inserir.
   * Esse decorator é responsável por chamar automaticamente a lógica de
   * criptografia ao inserir um novo administrador no banco de dados.
   */
  @CriptografarSenhaAntesDeInserir()
  async criptografarSenha() {
    // A lógica de criptografia está implementada no decorator CriptografarSenhaAntesDeInserir.
  }

  /**
   * Compara a senha informada com a senha armazenada (criptografada).
   * @param {string} senhaPlana - Senha não criptografada informada pelo usuário.
   * @returns {Promise<boolean>} - Retorna uma Promise que resolve para `true` se as senhas coincidirem, ou `false` se não.
   */
  async compararSenha(senhaPlana: string): Promise<boolean> {
    return await compararSenha(senhaPlana, this.senha);
  }

  /**
   * Método chamado automaticamente antes de inserir ou atualizar o registro
   * do administrador no banco de dados.
   * Esse método criptografa a senha do administrador com o algoritmo bcrypt
   * antes que a entidade seja salva ou atualizada no banco de dados.

   * @returns {Promise<void>} - Retorna uma Promise que se resolve após a criptografia da senha.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async handleCriptografiaSenha(): Promise<void> {
    this.senha = await criptografarSenha(this.senha);
  }
}
