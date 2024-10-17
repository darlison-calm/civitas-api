import { Router } from 'express';
import { MembrosController } from '../controller/membrosController';

const membrosRouter = Router();
const membrosController = new MembrosController();

membrosRouter.get('/', (req, res) => membrosController.listarMembros(req, res));
membrosRouter.post('/', (req, res) => membrosController.criarMembro(req, res));

export default membrosRouter;
