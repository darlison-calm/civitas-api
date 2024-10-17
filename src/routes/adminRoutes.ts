import { Router } from 'express';
import { AdminController } from '../controller/adminController';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get('/', (req, res) => adminController.listarAdmins(req, res));
adminRouter.get('/:id', (req, res) =>
  adminController.buscarAdminPorId(req, res)
);
adminRouter.post('/', (req, res) => adminController.criarAdmin(req, res));
adminRouter.put('/:id', (req, res) => adminController.atualizarAdmin(req, res));

export default adminRouter;
