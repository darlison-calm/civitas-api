import ProfessorController from '../controller/professorController';
import { Router } from 'express';

const professorRouter = Router();

professorRouter.post('/', (req, res) =>
  ProfessorController.criarProfessor(req, res)
);
professorRouter.get('/', (req, res) =>
  ProfessorController.listarProfessores(req, res)
);

professorRouter.get('/:id', (req, res) =>
  ProfessorController.buscarProfessorPorId(req, res)
);

professorRouter.put('/:id', (req, res) =>
  ProfessorController.editarProfessor(req, res)
);

professorRouter.delete('/:id', (req, res) =>
  ProfessorController.deletarProfessor(req, res)
);

export default professorRouter;
