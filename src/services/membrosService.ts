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

  async buscarMembroPorId(id: string) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const idNumber = Number(id);
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    return await membrosRepository.findOneBy({ id: idNumber });
  }

  async criarMembro(dadosMembro: Partial<Membros>) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const membrosRepository = MysqlDataSource.getRepository(Membros);
    const novoMembro = membrosRepository.create(dadosMembro);
    return await membrosRepository.save(novoMembro);
  }

  async atualizarMembro(id: string, dadosMembro: Partial<Membros>) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const idNumber = Number(id);
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    await membrosRepository.update(idNumber, dadosMembro);
    return await membrosRepository.findOneBy({ id: idNumber });
  }
}
