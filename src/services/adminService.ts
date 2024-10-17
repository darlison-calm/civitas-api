import { MysqlDataSource } from '../config/database';
import { Admin } from '../entities/adminEntities';
import { Membros } from '../entities/membrosEntities';
import { criptografarSenha, validarSenha } from '../utils/senhaUtils';

export class AdminService {
  async listarAdmins() {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.find({ relations: ['membro'] });
  }

  async buscarAdminPorId(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.findOne({
      where: { id },
      relations: ['membro']
    });
  }

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

  async deletarAdmin(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.delete(id);
  }
}
