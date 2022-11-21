import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarModel extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findOne(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }

  public async update(id: string, carUpdated: ICar): Promise<ICar | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { ...carUpdated }, { new: true });
  }
}

export default CarModel;