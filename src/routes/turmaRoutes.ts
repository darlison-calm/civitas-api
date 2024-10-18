import TurmasController from '../controller/turmasController';
import { Router } from 'express';

const turmasRouter = Router();

turmasRouter.post('/', (req, res) => TurmasController.criarTurma(req, res));
turmasRouter.get('/', (req, res) => TurmasController.listarTurmas(req, res));
turmasRouter.get('/:id', (req, res) => TurmasController.buscarTurma(req, res));
turmasRouter.put('/:id', (req, res) => TurmasController.editarTurma(req, res));
turmasRouter.delete('/:id', (req, res) =>
  TurmasController.deletarTurma(req, res)
);

export default turmasRouter;
