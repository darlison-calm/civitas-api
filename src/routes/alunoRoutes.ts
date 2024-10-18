// src/routes/aluno.routes.ts
import { Router } from 'express';
import { AlunoController } from '../controller/alunoController';
import { validarAluno } from '../middlewares/alunoMiddleware';

const router = Router();
const alunoController = new AlunoController();

router.post('/alunos', validarAluno, alunoController.cadastrar.bind(alunoController));

export default router;
