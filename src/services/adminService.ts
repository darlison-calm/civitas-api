import { MysqlDataSource } from '../config/database';
import { Admin } from '../entities/adminEntities';
import { Membros } from '../entities/membrosEntities';
import { criptografarSenha, compararSenha } from '../utils/senhaUtils';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export class AdminService {
  /**
   * Retorna uma lista de objetos que representam os administradores, incluindo o membro associado a cada um.
   * @returns Uma lista de objetos que representam os administradores.
   */
  async listarAdmins() {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.find({ relations: ['membro'] });
  }

  /**
   * Retorna um objeto que representa o administrador com o ID especificado,
   * incluindo o membro associado a ele.
   * @param id - O ID do administrador a ser buscado.
   * @returns Um objeto que representa o administrador com o ID especificado,
   *          ou `undefined` se o administrador com o ID especificado n o
   *          for encontrado.
   */
  async buscarAdminPorId(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.findOne({
      where: { id },
      relations: ['membro']
    });
  }

  /**
   * Cria um novo administrador.
   * @param apelido - O apelido do administrador.
   * @param email - O email do administrador.
   * @param senha - A senha do administrador.
   * @param membroId - O ID do membro associado ao administrador.
   * @returns O novo administrador criado.
   * @throws {Error} Se o membro com o ID especificado n o for encontrado.
   */
  async criarAdmin(
    apelido: string,
    email: string,
    senha: string,
    membroId: number
  ) {
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    const adminRepository = MysqlDataSource.getRepository(Admin);

    const membro = await membrosRepository.findOneBy({ id: membroId });
    if (!membro) {
      throw new Error('Membro não encontrado.');
    }

    const novoAdmin = adminRepository.create({
      apelido,
      email,
      senha,
      membro
    });

    return await adminRepository.save(novoAdmin);
  }

  /**
   * Atualiza um administrador existente.
   * @param id - O ID do administrador a ser atualizado.
   * @param apelido - O novo apelido do administrador.
   * @param email - O novo email do administrador.
   * @param senha - A nova senha do administrador, ou nulo se n o quiser atualizar a senha.
   * @param membroId - O ID do membro associado ao administrador.
   * @returns O administrador atualizado, ou nulo se o administrador n o for encontrado.
   * @throws {Error} Se o membro com o ID especificado n o for encontrado.
   */
  async atualizarAdmin(
    id: number,
    apelido: string,
    email: string,
    senha: string | null,
    membroId: number
  ) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    const membro = await MysqlDataSource.getRepository(Membros).findOneBy({
      id: membroId
    });

    if (!membro) {
      throw new Error('Membro não encontrado.');
    }

    const admin = await adminRepository.findOneBy({ id });
    if (!admin) {
      return null;
    }

    admin.apelido = apelido;
    admin.email = email;
    if (senha) {
      admin.senha = await criptografarSenha(senha);
    }
    admin.membro = membro;

    return await adminRepository.save(admin);
  }

  /**
   * Deleta um administrador existente.
   * @param id - O ID do administrador a ser deletado.
   * @returns Um objeto com a propriedade `affected` que indica quantos registros foram afetados.
   */
  async deletarAdmin(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.delete(id);
  }

  /**
   * Realiza o login de um administrador e retorna um token JWT.
   * @param email - O email do administrador.
   * @param senha - A senha do administrador.
   * @returns Um objeto com a propriedade `token` que é o token JWT.
   * @throws {Error} Se o administrador não for encontrado.
   * @throws {Error} Se a senha for inválida.
   */
  async login(email: string, senha: string) {
    const adminRepository = MysqlDataSource.getRepository(Admin);

    // Carrega o admin e o relacionamento com a entidade Membros
    const admin = await adminRepository.findOne({
      where: { email },
      relations: ['membro']
    });

    if (!admin) {
      throw new Error('Administrador não encontrado.');
    }

    const senhaValida = await compararSenha(senha, admin.senha);
    if (!senhaValida) {
      throw new Error('Senha inválida.');
    }

    // Acessa o campo `tipoConta` a partir da entidade Membros
    const { id } = admin;
    const tipoConta = admin.membro?.tipoConta;

    if (!tipoConta) {
      throw new Error('Tipo de conta não encontrado.');
    }

    // Gera o token JWT com o campo `tipoConta`
    const token = jwt.sign(
      { id, email: admin.email, tipoConta },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    return { token };
  }
}
