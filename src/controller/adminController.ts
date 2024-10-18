import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { criptografarSenha, compararSenha } from '../utils/senhaUtils';
import { gerarToken } from '../utils/jwtUtils';
import { MysqlDataSource } from '../config/database';
import { Admin } from '../entities/adminEntities';

export class AdminController {
  private adminService = new AdminService();

  /**
   * Lista todos os administradores.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna a lista de administradores em formato JSON ou um erro em caso de falha.
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
   * @param req - Objeto da requisição HTTP, contendo o ID do administrador nos parâmetros.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna o administrador correspondente ao ID, ou uma mensagem de erro se não encontrado.
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
   * @param req - Objeto da requisição HTTP, contendo as informações do administrador nos campos do corpo da requisição.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna o novo administrador criado em formato JSON ou um erro em caso de falha.
   */
  async criarAdmin(req: Request, res: Response): Promise<Response> {
    const { apelido, email, senha, membroId } = req.body;

    try {
      const senhaCriptografada = await criptografarSenha(senha);
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
   * @param req - Objeto da requisição HTTP, contendo o ID do administrador nos parâmetros e os dados atualizados no corpo.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna o administrador atualizado em formato JSON ou um erro em caso de falha.
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
   * Exclui um administrador existente.
   * Verifica se o usuário autenticado não está tentando excluir sua própria conta.
   * @param req - Objeto da requisição HTTP, contendo o ID do administrador nos parâmetros.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna uma resposta sem conteúdo (204) se o administrador for excluído com sucesso.
   *          Retorna um erro 403 se o usuário autenticado tentar excluir sua própria conta.
   *          Retorna um erro 404 se o administrador não for encontrado.
   *          Retorna um erro 500 se ocorrer um erro inesperado.
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
   * Realiza o login de um administrador e retorna um token JWT.
   * @param req - Objeto da requisição HTTP, contendo o email e senha do administrador nos campos do corpo da requisição.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna um token JWT em formato JSON ou um erro em caso de falha.
   */
  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    try {
      const adminRepository = MysqlDataSource.getRepository(Admin);
      const admin = await adminRepository.findOne({ where: { email } });

      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      const senhaValida = await compararSenha(senha, admin.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      const token = gerarToken({ id: admin.id, email: admin.email });

      // Ajuste para retornar apenas o token
      return res.json({ token });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
}
