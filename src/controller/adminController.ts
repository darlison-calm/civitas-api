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

  async buscarAdminPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const admin = await this.adminService.buscarAdminPorId(Number(id));
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).json({ error: 'Administrador não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administrador.' });
    }
  }

  async criarAdmin(req: Request, res: Response) {
    try {
      const { apelido, email, senha, membroId } = req.body;
      const novoAdmin = await this.adminService.criarAdmin(
        apelido,
        email,
        senha,
        Number(membroId)
      );
      res.status(201).json(novoAdmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { apelido, email, senha, membroId } = req.body;
      const adminAtualizado = await this.adminService.atualizarAdmin(
        Number(id),
        apelido,
        email,
        senha,
        Number(membroId)
      );
      if (adminAtualizado) {
        res.json(adminAtualizado);
      } else {
        res.status(404).json({ error: 'Administrador não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar administrador.' });
    }
  }

  async deletarAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultado = await this.adminService.deletarAdmin(Number(id));
      if (resultado.affected) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Administrador não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar administrador.' });
    }
  }
}
