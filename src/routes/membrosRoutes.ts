import { Router } from 'express';
import { MembrosController } from '../controller/membrosController';

const membrosRouter = Router();
const membrosController = new MembrosController();

membrosRouter.get('/', (req, res) => membrosController.listarMembros(req, res));
membrosRouter.get('/:id', (req, res) =>
  membrosController.buscarMembroPorId(req, res)
);
membrosRouter.post('/', (req, res) => membrosController.criarMembro(req, res));
membrosRouter.put('/:id', (req, res) =>
  membrosController.atualizarMembro(req, res)
);

export default membrosRouter;
