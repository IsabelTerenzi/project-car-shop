import { Router } from 'express';
import MotoController from '../Controllers/MotoController';

const motoRouter = Router();

motoRouter.post('/', (req, res, next) => new MotoController(req, res, next).create());
motoRouter.get('/', (req, res, next) => new MotoController(req, res, next).findAll());
motoRouter.get('/:id', (req, res, next) => new MotoController(req, res, next).findOne());
motoRouter.put('/:id', (req, res, next) => new MotoController(req, res, next).update());
motoRouter.delete('/:id', (req, res, next) => new MotoController(req, res, next).delete());

export default motoRouter;