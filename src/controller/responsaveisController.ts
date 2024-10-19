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
}
