import { Model, Schema, model, models, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findOne(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, vehicleUpdated: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...vehicleUpdated } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}

export default AbstractODM;