import { MysqlDataSource } from '../config/database';
import { Membros } from '../entities/membrosEntities';

/**
 * Serviço responsável por operações relacionadas aos membros no banco de dados.
 */
export class MembrosService {
  /**
   * Lista todos os membros no banco de dados.
   * @returns Uma lista de objetos Membros.
   */
  async listarMembros() {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const membrosRepository = MysqlDataSource.getRepository(Membros);
    return await membrosRepository.find();
  }

  /**
   * Busca um membro específico pelo ID no banco de dados.
   * @param id - O ID do membro a ser buscado.
   * @returns O membro correspondente ao ID ou `null` se não encontrado.
   */
  async buscarMembroPorId(id: string) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const idNumber = Number(id);
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    return await membrosRepository.findOneBy({ id: idNumber });
  }

  /**
   * Cria um novo membro no banco de dados.
   * @param dadosMembro - Um objeto parcial contendo os dados do novo membro.
   * @returns O objeto Membros recém-criado.
   */
  async criarMembro(dadosMembro: Partial<Membros>) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const membrosRepository = MysqlDataSource.getRepository(Membros);
    const novoMembro = membrosRepository.create(dadosMembro);
    return await membrosRepository.save(novoMembro);
  }

  /**
   * Atualiza um membro existente no banco de dados.
   * @param id - O ID do membro a ser atualizado.
   * @param dadosMembro - Um objeto parcial contendo os dados a serem atualizados.
   * @returns O membro atualizado ou `null` se o membro não for encontrado.
   */
  async atualizarMembro(id: string, dadosMembro: Partial<Membros>) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const idNumber = Number(id);
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    await membrosRepository.update(idNumber, dadosMembro);
    return await membrosRepository.findOneBy({ id: idNumber });
  }

  /**
   * Deleta um membro existente no banco de dados.
   * @param id - O ID do membro a ser deletado.
   * @returns O resultado da operação de exclusão.
   */
  async deletarMembro(id: string) {
    if (!MysqlDataSource.isInitialized) {
      await MysqlDataSource.initialize();
    }

    const idNumber = Number(id);
    const membrosRepository = MysqlDataSource.getRepository(Membros);
    return await membrosRepository.delete(idNumber);
  }
}
