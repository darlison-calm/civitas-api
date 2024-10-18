import { Request, Response } from 'express';
import TurmasService from '../services/turmasService';

/**
 * Controlador para gerenciar as rotas relacionadas a turmas.
 */
class TurmasControllerClass {
  /**
   * Cria uma nova turma com os dados fornecidos na requisição.
   *
   * @param req - O objeto de requisição contendo os dados da nova turma.
   * @param res - O objeto de resposta para enviar de volta ao cliente.
   * @returns Uma promessa que resolve para um objeto JSON com a turma criada ou um erro, se ocorrer.
   */
  async criarTurma(req: Request, res: Response): Promise<Response> {
    try {
      const novaTurma = await TurmasService.criar(req.body);
      return res.status(201).json(novaTurma);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar turma' });
    }
  }

  /**
   * Lista todas as turmas cadastradas.
   *
   * @param req - O objeto de requisição. (Não utilizado atualmente)
   * @param res - O objeto de resposta para enviar de volta ao cliente.
   * @returns Uma promessa que resolve para um objeto JSON contendo todas as turmas ou um erro, se ocorrer.
   */
  async listarTurmas(req: Request, res: Response): Promise<Response> {
    try {
      const turmas = await TurmasService.listar();
      return res.status(200).json(turmas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar turmas' });
    }
  }

  /**
   * Busca uma turma específica pelo ID.
   *
   * @param req - O objeto de requisição contendo o ID da turma.
   * @param res - O objeto de resposta para enviar de volta ao cliente.
   * @returns Uma promessa que resolve para um objeto JSON com a turma encontrada ou um erro, se ocorrer.
   */
  async buscarTurma(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const turma = await TurmasService.buscarPorId(id);
      if (turma) {
        return res.status(200).json(turma);
      }
      return res
        .status(404)
        .json({ error: `Turma com ID ${id} não encontrada.` });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar turma' });
    }
  }

  /**
   * Atualiza uma turma existente.
   *
   * @param req - O objeto de requisição contendo o ID da turma e os dados atualizados.
   * @param res - O objeto de resposta para enviar de volta ao cliente.
   * @returns Uma promessa que resolve para um objeto JSON com a turma atualizada ou um erro, se ocorrer.
   */
  async editarTurma(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const turmaAtualizada = await TurmasService.editar(id, req.body);
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Deleta uma turma pelo ID.
   *
   * @param req - O objeto de requisição contendo o ID da turma a ser deletada.
   * @param res - O objeto de resposta para enviar de volta ao cliente.
   * @returns Uma promessa que resolve para um status de sucesso ou um erro, se ocorrer.
   */
  async deletarTurma(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      await TurmasService.deletar(id);
      return res.status(204).send(); // Usar send() para não retornar conteúdo
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar turma' });
    }
  }
}

const TurmasController = new TurmasControllerClass();
export default TurmasController;
