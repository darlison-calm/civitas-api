import { MysqlDataSource } from '../config/database';
import { Membros } from '../entities/membrosEntities';

export class MembrosService {
  async listarMembros() {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const membrosRepository = MysqlDataSource.getRepository(Membros);
    return await membrosRepository.find();
  }
}
