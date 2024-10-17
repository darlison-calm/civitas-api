/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - apelido
 *         - email
 *         - senha
 *         - membroId
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do administrador.
 *         apelido:
 *           type: string
 *           description: Apelido único do administrador.
 *         email:
 *           type: string
 *           description: Email do administrador.
 *         senha:
 *           type: string
 *           description: Senha criptografada do administrador.
 *         membroId:
 *           type: integer
 *           description: ID do membro associado ao administrador.
 *       example:
 *         id: 1
 *         apelido: "admin123"
 *         email: "U9w0H@example.com"
 *         senha: "Admin!123"
 *         membroId: 1
 *
 * tags:
 *   name: Admin
 *   description: Operações relacionadas aos administradores
 *
 * /admin:
 *   get:
 *     summary: Retorna a lista de todos os administradores
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de todos os administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Erro ao listar administradores.
 *
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Falha de validação da senha ou membro não encontrado.
 *       500:
 *         description: Erro ao criar administrador.
 *
 * /admin/{id}:
 *   get:
 *     summary: Retorna um administrador pelo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do administrador
 *     responses:
 *       200:
 *         description: Administrador retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Administrador não encontrado.
 *       500:
 *         description: Erro ao buscar administrador.
 *
 *   put:
 *     summary: Atualiza um administrador pelo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Administrador não encontrado.
 *       400:
 *         description: Falha de validação da senha ou membro não encontrado.
 *       500:
 *         description: Erro ao atualizar administrador.
 *
 *   delete:
 *     summary: Deleta um administrador pelo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do administrador
 *     responses:
 *       204:
 *         description: Administrador deletado com sucesso.
 *       404:
 *         description: Administrador não encontrado.
 *       500:
 *         description: Erro ao deletar administrador.
 */

import { Router } from 'express';
import { AdminController } from '../controller/adminController';

const adminRouter = Router();
const adminController = new AdminController();

/**
 * Rota para listar todos os administradores.
 */
adminRouter.get('/', (req, res) => adminController.listarAdmins(req, res));

/**
 * Rota para buscar um administrador específico por ID.
 */
adminRouter.get('/:id', (req, res) =>
  adminController.buscarAdminPorId(req, res)
);

/**
 * Rota para criar um novo administrador.
 */
adminRouter.post('/', (req, res) => adminController.criarAdmin(req, res));

/**
 * Rota para atualizar um administrador existente.
 */
adminRouter.put('/:id', (req, res) => adminController.atualizarAdmin(req, res));

/**
 * Rota para deletar um administrador específico por ID.
 */
adminRouter.delete('/:id', (req, res) =>
  adminController.deletarAdmin(req, res)
);

export default adminRouter;
