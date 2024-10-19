import { Request, Response } from 'express';
import { ResponsaveisService } from '../services/responsaveisService';

const responsaveisService = new ResponsaveisService();

export class ResponsaveisController {
  async listarResponsaveis(req: Request, res: Response) {
    const responsaveis = await responsaveisService.listarResponsaveis();
    return res.json(responsaveis);
  }

  async buscarResponsavelPorId(req: Request, res: Response) {
    const { id } = req.params;
    const responsavel = await responsaveisService.buscarResponsavelPorId(id);
    return res.json(responsavel);
  }

 async criarResponsavel(req: Request, res: Response) {
    const dadosResponsavel = req.body;
    const responsavelCriado =
      await responsaveisService.criarResponsavel(dadosResponsavel);
    return res.json(responsavelCriado);
  }

  async atualizarResponsavel(req: Request, res: Response) {
    const { id } = req.params;
    const dadosResponsavel = req.body;
    const responsavelAtualizado =
      await responsaveisService.atualizarResponsavel(id, dadosResponsavel);
    return res.json(responsavelAtualizado);
  }

  async deletarResponsavel(req: Request, res: Response) {
    const { id } = req.params;
    const resultado = await responsaveisService.deletarResponsavel(id);
    return res.json({ message: 'Responsável deletado com sucesso', resultado });
  }
}
