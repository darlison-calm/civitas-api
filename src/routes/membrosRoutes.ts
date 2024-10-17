import { Router } from 'express';
import { MembrosController } from '../controller/membrosController';

const membrosRouter = Router();
const membrosController = new MembrosController();

membrosRouter.get('/', (req, res) => membrosController.listarMembros(req, res));

export default membrosRouter;
