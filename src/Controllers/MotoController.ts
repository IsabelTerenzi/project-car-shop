import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoService from '../Services/MotoService';

class MotoController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotoService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotoService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const motorcycles = await this.service.findAll();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findOne() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    try {
      const moto = await this.service.findOne(id);

      if (!moto) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }

      return this.res.status(200).json(moto);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const motoUpdated: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    
    try {
      const moto = await this.service.update(id, motoUpdated);

      if (!moto) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }

      return this.res.status(200).json(moto);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotoController;