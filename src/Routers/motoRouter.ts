import { Router } from 'express';
import MotoController from '../Controllers/MotoController';

const motoRouter = Router();

motoRouter.post('/', (req, res, next) => new MotoController(req, res, next).create());

export default motoRouter;