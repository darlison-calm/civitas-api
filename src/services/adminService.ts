import { MysqlDataSource } from '../config/database';
import { Admin } from '../entities/adminEntities';
import { Membros } from '../entities/membrosEntities';
import { criptografarSenha, validarSenha } from '../utils/senhaUtils';

export class AdminService {
  /**
   * Lista todos os administradores com seus membros associados.
   * @returns Uma lista de administradores com as relações de membros.
   */
  async listarAdmins() {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.find({ relations: ['membro'] });
  }

  /**
   * Busca um administrador pelo ID, incluindo o membro associado.
   * @param id - O ID do administrador a ser buscado.
   * @returns O administrador encontrado ou `null` se não for encontrado.
   */
  async buscarAdminPorId(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.findOne({
      where: { id },
      relations: ['membro']
    });
  }

  /**
   * Cria um novo administrador, associando-o a um membro existente e criptografando sua senha.
   * @param apelido - O apelido do administrador.
   * @param senha - A senha do administrador.
   * @param membroId - O ID do membro associado ao administrador.
   * @throws Se o membro não for encontrado, se a senha não for válida ou se a senha for omitida.
   * @returns O administrador criado.
   */
  async criarAdmin(apelido: string, senha: string, membroId: number) {
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    const adminRepository = MysqlDataSource.getRepository(Admin);
    const membro = await membrosRepository.findOneBy({ id: membroId });

    if (!membro) {
      throw new Error('Membro não encontrado.');
    }

    if (!senha) {
      throw new Error('A senha é obrigatória.');
    }

    if (!validarSenha(senha)) {
      throw new Error(
        'A senha deve ter 8 caracteres, incluir pelo menos uma letra maiúscula e um caractere especial.'
      );
    }

    const senhaCriptografada = await criptografarSenha(senha);
    const novoAdmin = new Admin();

    novoAdmin.apelido = apelido;
    novoAdmin.senha = senhaCriptografada;
    novoAdmin.membro = membro;
    return await adminRepository.save(novoAdmin);
  }

  /**
   * Atualiza um administrador existente, associando-o a um novo membro e atualizando a senha, se fornecida.
   * @param id - O ID do administrador a ser atualizado.
   * @param apelido - O novo apelido do administrador.
   * @param senha - A nova senha do administrador (opcional).
   * @param membroId - O ID do novo membro associado ao administrador.
   * @throws Se o membro não for encontrado ou se a senha não for válida.
   * @returns O administrador atualizado ou `null` se não for encontrado.
   */
  async atualizarAdmin(
    id: number,
    apelido: string,
    senha: string,
    membroId: number
  ) {
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    const adminRepository = MysqlDataSource.getRepository(Admin);

    const membro = await membrosRepository.findOneBy({ id: membroId });
    if (!membro) {
      throw new Error('Membro não encontrado.');
    }

    const admin = await adminRepository.findOneBy({ id });
    if (!admin) {
      return null;
    }

    if (senha && !validarSenha(senha)) {
      throw new Error(
        'A senha deve ter 8 caracteres, incluir pelo menos uma letra maiúscula e um caractere especial.'
      );
    }

    admin.apelido = apelido;
    admin.senha = senha ? await criptografarSenha(senha) : admin.senha;
    admin.membro = membro;
    return await adminRepository.save(admin);
  }

  /**
   * Deleta um administrador pelo ID.
   * @param id - O ID do administrador a ser deletado.
   * @returns O resultado da operação de exclusão.
   */
  async deletarAdmin(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.delete(id);
  }
}
