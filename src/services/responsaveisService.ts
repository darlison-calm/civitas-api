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

  async criarResponsavel(dadosResponsavel: Partial<Responsaveis>) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const responsaveisRepository = MysqlDataSource.getRepository(Responsaveis);
    const novoResponsavel = responsaveisRepository.create(dadosResponsavel);
    return await responsaveisRepository.save(novoResponsavel);
  }

  async atualizarResponsavel(
    id: string,
    dadosResponsavel: Partial<Responsaveis>
  ) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const responsaveisRepository = MysqlDataSource.getRepository(Responsaveis);
    await responsaveisRepository.update(id, dadosResponsavel);
    return await responsaveisRepository.findOneBy({ id: Number(id) });
  }

  async deletarResponsavel(id: string) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const responsaveisRepository = MysqlDataSource.getRepository(Responsaveis);
    return await responsaveisRepository.delete(Number(id));
  }
}
