
import { MysqlDataSource } from '../config/database'; // Importando o DataSource
import { Aluno } from '../entities/alunoEntity';

export class AlunoService {
    private readonly alunoRepository = MysqlDataSource.getRepository(Aluno); // Marcado como readonly

    async cadastrarAluno(alunoData: Partial<Aluno>): Promise<Aluno> {
        const aluno = this.alunoRepository.create(alunoData);
        return await this.alunoRepository.save(aluno);
    }
}

