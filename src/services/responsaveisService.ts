import { MysqlDataSource } from '../config/database';
import { Responsaveis } from '../entities/responsaveisEntities';

export class ResponsaveisService {
  async listarResponsaveis() {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const responsaveisRepository = MysqlDataSource.getRepository(Responsaveis);
    return await responsaveisRepository.find();
  }

  async buscarResponsavelPorId(id: string) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const responsaveisRepository = MysqlDataSource.getRepository(Responsaveis);
    return await responsaveisRepository.findOneBy({ id: Number(id) });
  }
}
