import ProfessorController from '../controller/professorController';
import { Router } from 'express';

const professorRouter = Router();

professorRouter.post('/', (req, res) =>
  ProfessorController.criarProfessor(req, res)
);
professorRouter.get('/', (req, res) =>
  ProfessorController.listarProfessores(req, res)
);

export default professorRouter;
