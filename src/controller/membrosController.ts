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

  async buscarMembroPorId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const membro = await this.membrosService.buscarMembroPorId(id);
      if (membro) {
        res.json(membro);
      } else {
        res.status(404).json({ error: 'Membro não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar membro' });
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
