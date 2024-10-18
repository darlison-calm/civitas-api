/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do administrador
 *         apelido:
 *           type: string
 *           description: Apelido do administrador
 *         email:
 *           type: string
 *           description: Email do administrador
 *         membro:
 *           type: object
 *           description: Membro associado ao administrador
 *           properties:
 *             id:
 *               type: integer
 *               description: ID do membro
 *             nome:
 *               type: string
 *               description: Nome do membro
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do administrador
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de última atualização do administrador
 *
 * tags:
 *   name: Administradores
 *   description: Operações de gerenciamento de administradores
 *
 * /admin/login:
 *   post:
 *     summary: Autentica um administrador e retorna um token JWT
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha
 *             properties:
 *               login:
 *                 type: string
 *                 description: Email ou apelido do administrador
 *               senha:
 *                 type: string
 *                 description: Senha do administrador
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Credenciais inválidas
 *
 * /admin:
 *   get:
 *     summary: Lista todos os administradores
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Token de autenticação não fornecido ou inválido
 *       403:
 *         description: Acesso negado (não autorizado)
 *
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apelido
 *               - email
 *               - senha
 *               - membroId
 *             properties:
 *               apelido:
 *                 type: string
 *                 description: Apelido do administrador
 *               email:
 *                 type: string
 *                 description: Email do administrador
 *               senha:
 *                 type: string
 *                 description: Senha do administrador
 *               membroId:
 *                 type: integer
 *                 description: ID do membro associado ao administrador
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Erro ao criar administrador
 *
 * /admin/{id}:
 *   get:
 *     summary: Busca um administrador pelo ID
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Administrador não encontrado
 *       401:
 *         description: Token de autenticação não fornecido ou inválido
 *       403:
 *         description: Acesso negado (não autorizado)
 *
 *   put:
 *     summary: Atualiza um administrador pelo ID
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apelido
 *               - email
 *               - senha
 *               - membroId
 *             properties:
 *               apelido:
 *                 type: string
 *                 description: Apelido do administrador
 *               email:
 *                 type: string
 *                 description: Email do administrador
 *               senha:
 *                 type: string
 *                 description: Senha do administrador (opcional)
 *               membroId:
 *                 type: integer
 *                 description: ID do membro associado ao administrador
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Administrador não encontrado
 *       500:
 *         description: Erro ao atualizar administrador
 *
 *   delete:
 *     summary: Deleta um administrador pelo ID
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do administrador
 *     responses:
 *       204:
 *         description: Administrador deletado com sucesso
 *       404:
 *         description: Administrador não encontrado
 *       500:
 *         description: Erro ao deletar administrador
 */

import { Router } from 'express';
import { AdminController } from '../controller/adminController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/isAdmin';

const adminRouter = Router();
const adminController = new AdminController();

/**
 * Rota para autenticar um administrador e obter um token JWT.
 */
adminRouter.post('/login', (req, res) => adminController.login(req, res));

/**
 * Rota para listar todos os administradores.
 */
adminRouter.get('/', authenticateJWT, isAdmin, (req, res) => 
  adminController.listarAdmins(req, res)
);

/**
 * Rota para buscar um administrador específico por ID.
 */
adminRouter.get('/:id', authenticateJWT, isAdmin, (req, res) =>
  adminController.buscarAdminPorId(req, res)
);

/**
 * Rota para criar um novo administrador.
 */
adminRouter.post('/', (req, res) => adminController.criarAdmin(req, res));

/**
 * Rota para atualizar um administrador existente.
 */
adminRouter.put('/:id', authenticateJWT, isAdmin, (req, res) =>
  adminController.atualizarAdmin(req, res)
);

/**
 * Rota para deletar um administrador específico por ID.
 */
adminRouter.delete('/:id', authenticateJWT, isAdmin, (req, res) =>
  adminController.deletarAdmin(req, res)
);

export default adminRouter;
