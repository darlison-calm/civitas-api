import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { criptografarSenha } from '../utils/senhaUtils';

export class AdminController {
  private adminService = new AdminService();

  /**
   * Lista todos os administradores.
   */
  async listarAdmins(req: Request, res: Response): Promise<Response> {
    try {
      const admins = await this.adminService.listarAdmins();
      return res.json(admins);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar administradores.' });
    }
  }

  /**
   * Busca um administrador específico pelo ID.
   */
  async buscarAdminPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const admin = await this.adminService.buscarAdminPorId(Number(id));
      if (admin) {
        return res.json(admin);
      }
      return res.status(404).json({ error: 'Administrador não encontrado.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar administrador.' });
    }
  }

  /**
   * Cria um novo administrador.
   */
  async criarAdmin(req: Request, res: Response): Promise<Response> {
    const { apelido, email, senha, membroId } = req.body;

    try {
      const senhaCriptografada = await criptografarSenha(senha);
      console.log('Senha criptografada antes de salvar:', senhaCriptografada);

      const novoAdmin = await this.adminService.criarAdmin(
        apelido,
        email,
        senhaCriptografada,
        Number(membroId)
      );

      return res.status(201).json(novoAdmin);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Atualiza um administrador existente.
   */
  async atualizarAdmin(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { apelido, email, senha, membroId } = req.body;

    try {
      const adminAtualizado = await this.adminService.atualizarAdmin(
        Number(id),
        apelido,
        email,
        senha,
        Number(membroId)
      );
      if (adminAtualizado) {
        return res.json(adminAtualizado);
      }
      return res.status(404).json({ error: 'Administrador não encontrado.' });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Erro ao atualizar administrador.' });
    }
  }

  /**
   * Deleta um administrador existente.
   */
  async deletarAdmin(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const adminAutenticadoId = req.user?.id;
    try {
      if (Number(id) === adminAutenticadoId) {
        return res
          .status(403)
          .json({ error: 'Você não pode excluir sua própria conta.' });
      }

      const resultado = await this.adminService.deletarAdmin(Number(id));
      if (resultado.affected) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'Administrador não encontrado.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Realiza o login de um administrador com base no email e senha fornecidos.
   */
  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    try {
      const token = await this.adminService.login(email, senha);
      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
}
