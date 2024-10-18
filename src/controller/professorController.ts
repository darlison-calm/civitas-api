import { Request, Response } from 'express';
import ProfessorService from '../services/professorService';

/**
 * Classe responsável por gerenciar as operações de controle de professores.
 */
class ProfessorControllerClass {
  /**
   * Cria um novo professor.
   *
   * @param req - O  objeto da requisão contendo os dados do professor.
   * @param res - A resposta HTTP para ser enviada ao cliente.
   */
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
  /**
   * Lista todos os professores.
   *
   * @param req - A requisição HTTP.
   * @param res - A resposta HTTP para ser enviada ao cliente.
   */
  async listarProfessores(req: Request, res: Response) {
    try {
      const professores = await ProfessorService.listarProfessores();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar professores', error });
    }
  }
  /**
   * Busca um professor pelo ID.
   *
   * @param req - A requisição HTTP contendo o ID do professor.
   * @param res - A resposta HTTP para ser enviada ao cliente.
   */
  async buscarProfessorPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = Number(id);
      const professor =
        await ProfessorService.buscarProfessorPorId(professorId);
      return res.json(professor);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao buscar professor', error });
    }
  }
  /**
   * Deleta um professor pelo ID.
   *
   * @param req - A requisição HTTP contendo o ID do professor.
   * @param res - A resposta HTTP para ser enviada ao cliente.
   */
  async deletarProfessor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = Number(id);
      await ProfessorService.deletarProfessor(professorId);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao deletar professor', error });
    }
  }
  /**
   * Edita os detalhes de um professor existente.
   *
   * @param req - A requisição HTTP contendo o ID do professor e os novos dados.
   * @param res - A resposta HTTP para ser enviada ao cliente.
   * @returns A resposta HTTP com o professor atualizado.
   */
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
