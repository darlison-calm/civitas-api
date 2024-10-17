import { Router } from 'express';
import { AdminController } from '../controller/adminController';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get('/', (req, res) => adminController.listarAdmins(req, res));

export default adminRouter;
