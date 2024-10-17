import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export class AdminController {
  private adminService = new AdminService();

  async listarAdmins(req: Request, res: Response) {
    try {
      const admins = await this.adminService.listarAdmins();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar administradores.' });
    }
  }
}
