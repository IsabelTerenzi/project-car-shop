import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRouter = Router();

carRouter.post('/', (req, res, next) => new CarController(req, res, next).create());
carRouter.get('/', (req, res, next) => new CarController(req, res, next).findAll());
carRouter.get('/:id', (req, res, next) => new CarController(req, res, next).findOne());
carRouter.put('/:id', (req, res, next) => new CarController(req, res, next).update());

export default carRouter;