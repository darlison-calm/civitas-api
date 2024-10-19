import { MysqlDataSource } from '../config/database';
import { Turma } from '../entities/turmasEntities';
import { Membros } from '../entities/membrosEntities';
import { Alunos } from '../entities/alunosEntities';

export class AlunosServiceClass {
  private membrosRepository = MysqlDataSource.getRepository(Membros);
  private alunosRepository = MysqlDataSource.getRepository(Alunos);

  async criarAluno(turma: Turma, membroId: number): Promise<Alunos> {
    const membro = await this.membrosRepository.findOneBy({ id: membroId });
    const novoAluno = this.alunosRepository.create({
      membro,
      turma
    });
    return await this.alunosRepository.save(novoAluno);
  }

  async listarAlunos(): Promise<Alunos[]> {
    return await this.alunosRepository.find({
      relations: ['membro', 'turma']
    });
  }
  async buscarAlunoPorId(id: number): Promise<Alunos> {
    return await this.alunosRepository.findOne({
      where: { id },
      relations: ['membro', 'turma']
    });
  }

  async deletarAluno(id: number) {
    const aluno = await this.alunosRepository.findOne({
      where: { id },
      relations: ['membro']
    });

    await this.membrosRepository.delete(aluno.membro.id);
    return await this.alunosRepository.delete(id);
  }
  async editarAluno(id: number, turmas: Turma | null, membroId: number) {
    const membro = await this.membrosRepository.findOneBy({ id: membroId });
    const alunoExistente = await this.alunosRepository.findOneBy({ id });

    Object.assign(alunoExistente, {
      membro,
      turmas
    });
    return await this.alunosRepository.save(alunoExistente);
  }
}

const AlunosService = new AlunosServiceClass();
export default AlunosService;
