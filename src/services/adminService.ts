import { MysqlDataSource } from '../config/database';
import { Admin } from '../entities/adminEntities';

export class AdminService {
  async listarAdmins() {
    const adminRepository = MysqlDataSource.getRepository(Admin);
    return await adminRepository.find({ relations: ['membro'] });
  }
}
