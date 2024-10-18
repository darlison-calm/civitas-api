import { Request, Response } from 'express';
import ProfessorService from '../services/professorService';
import { MembrosService } from '../services/membrosService';

class ProfessorControllerClass {
  private membrosService = new MembrosService();

  async criarProfessor(req: Request, res: Response) {
    try {
      const {
        numeroMatricula,
        email,
        nomeCompleto,
        dataNascimento,
        rg,
        cpf,
        tipoConta,
        senha
      } = req.body;
      if (tipoConta !== 'professor') {
        return res
          .status(400)
          .json({ message: 'O tipo da conta deve ser professor.' });
      }
      const novoMembro = await this.membrosService.criarMembro({
        numeroMatricula,
        email,
        nomeCompleto,
        dataNascimento,
        rg,
        cpf,
        tipoConta
      });
      console.log(novoMembro);

      const novoProfessor = await ProfessorService.criar({
        membro: novoMembro,
        senha: senha,
        turmas: null
      });

      res.status(201).json(novoProfessor);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar professor', error });
    }
  }

  async listarProfessores(req: Request, res: Response) {
    try {
      const professores = await ProfessorService.listar();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar professores', error });
    }
  }
}

const ProfessorController = new ProfessorControllerClass();
export default ProfessorController;
