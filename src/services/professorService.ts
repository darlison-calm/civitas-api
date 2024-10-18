import { Professor } from '../entities/professorEntities';
// import { Turma } from '../entities/turmasEntities';
import { MysqlDataSource } from '../config/database';

export class ProfessorServiceClass {
  private professorRepostiory = MysqlDataSource.getRepository(Professor);
  // private turmaRepository = MysqlDataSource.getRepository(Turma)

  async criar(dadosProfessor: Partial<Professor>): Promise<Professor> {
    const novoProfessor = this.professorRepostiory.create(dadosProfessor);
    return await this.professorRepostiory.save(novoProfessor);
  }

  async listar(): Promise<Professor[]> {
    return await this.professorRepostiory.find({
      relations: ['membro', 'turmas']
    });
  }

  async buscarProfessorPorId(
    professorId: string | number
  ): Promise<Professor | null> {
    const id = Number(professorId);
    return await this.professorRepostiory.findOne({
      where: { id },
      relations: ['membro', 'turmas']
    });
  }
}

const ProfessorService = new ProfessorServiceClass();
export default ProfessorService;
