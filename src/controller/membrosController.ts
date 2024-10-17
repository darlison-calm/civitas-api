import { MembrosService } from '../services/membrosService';
import { Request, Response } from 'express';

export class MembrosController {
  private membrosService = new MembrosService();

  async listarMembros(req: Request, res: Response) {
    try {
      const membros = await this.membrosService.listarMembros();
      res.json(membros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar membros' });
    }
  }

  async criarMembro(req: Request, res: Response) {
    try {
      const novoMembro = await this.membrosService.criarMembro(req.body);
      res.status(201).json(novoMembro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar membro' });
    }
  }
}
