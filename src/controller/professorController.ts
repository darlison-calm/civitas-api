import { Request, Response } from 'express';
import ProfessorService from '../services/professorService';

class ProfessorControllerClass {
  async criarProfessor(req: Request, res: Response) {
    try {
      const { senha, turmas, membroId } = req.body;

      const novoProfessor = await ProfessorService.criarProfessor(
        senha,
        turmas,
        membroId
      );

      res.status(201).json(novoProfessor);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar professor', error });
    }
  }

  async listarProfessores(req: Request, res: Response) {
    try {
      const professores = await ProfessorService.listarProfessores();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar professores', error });
    }
  }

  async buscarProfessorPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = Number(id);
      const professor =
        await ProfessorService.buscarProfessorPorId(professorId);
      res.json(professor);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar professor', error });
    }
  }

  async deletarProfessor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = Number(id);
      await ProfessorService.deletarProfessor(professorId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar professor', error });
    }
  }

  async editarProfessor(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const { turmas, senha, membroId } = req.body;

      const professorAtualizado = await ProfessorService.editar(
        id,
        turmas,
        senha,
        membroId
      );

      return res.json(professorAtualizado);
    } catch (error) {
      console.error('Erro ao editar professor:', error);
      return res.status(500).json({ error: error.message });
    }
  }
  
}

const ProfessorController = new ProfessorControllerClass();
export default ProfessorController;
