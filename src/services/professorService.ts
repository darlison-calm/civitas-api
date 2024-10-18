import { Professor } from '../entities/professorEntities';
import { MysqlDataSource } from '../config/database';
import { Turma } from '../entities/turmasEntities';
import { Membros } from '../entities/membrosEntities';

export class ProfessorServiceClass {
  private professorRepository = MysqlDataSource.getRepository(Professor);
  private membrosRepository = MysqlDataSource.getRepository(Membros);
  // private turmaRepository = MysqlDataSource.getRepository(Turma)

  async criarProfessor(
    senha: string,
    turmas: Turma[],
    membroId: number
  ): Promise<Professor> {
    const membro = await this.membrosRepository.findOneBy({ id: membroId });
    const novoProfessor = this.professorRepository.create({
      senha,
      membro,
      turmas
    });
    return await this.professorRepository.save(novoProfessor);
  }

  async listarProfessores(): Promise<Professor[]> {
    return await this.professorRepository.find({
      relations: ['membro', 'turmas']
    });
  }

  async buscarProfessorPorId(id: number): Promise<Professor> {
    return await this.professorRepository.findOne({
      where: { id },
      relations: ['membro', 'turmas']
    });
  }

  async deletarProfessor(id: number) {
    return await this.professorRepository.delete(id);
  }

  async editar(
    id: number,
    turmas: Turma[] | null,
    senha: string,
    membroId: number
  ) {
    const membro = await this.membrosRepository.findOneBy({ id: membroId });

    const professorExistente = await this.professorRepository.findOneBy({ id });
    professorExistente.turmas = turmas;

    Object.assign(professorExistente, {
      senha,
      membro,
      turmas
    });
    return await this.professorRepository.save(professorExistente);
  }
}

const ProfessorService = new ProfessorServiceClass();
export default ProfessorService;
