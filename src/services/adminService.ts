import { MysqlDataSource } from '../config/database';
import { Admin } from '../entities/adminEntities';
import { Membros } from '../entities/membrosEntities';
import { criptografarSenha, compararSenha } from '../utils/senhaUtils';
import * as jwt from 'jsonwebtoken';

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

  async deletarAdmin(id: number) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.delete(id);
  }

  async login(email: string, senha: string) {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    const admin = await adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new Error('Administrador não encontrado.');
    }

    const senhaValida = await compararSenha(senha, admin.senha);
    if (!senhaValida) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email
      },
      process.env.JWT_SECRET || 'ChaveSecreta',
      { expiresIn: '1h' }
    );
    return { token };
  }
}
