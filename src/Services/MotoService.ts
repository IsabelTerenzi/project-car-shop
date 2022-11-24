import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoModel from '../Models/MotoModel';

class MotoService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async create(moto: IMotorcycle) {
    const motoModel = new MotoModel();
    const newMoto = await motoModel.create(moto);
    return this.createMotoDomain(newMoto);
  }

  public async findAll() {
    const motoModel = new MotoModel();
    const motorcycles = await motoModel.findAll();
    const motosArr = motorcycles.map((moto) => this.createMotoDomain(moto));
    return motosArr;
  }

  public async findOne(id: string) {
    const motoModel = new MotoModel();
    const moto = await motoModel.findOne(id);
    return this.createMotoDomain(moto); 
  }

  public async update(id: string, motoUpdated: IMotorcycle) {
    const motoModel = new MotoModel();
    const moto = await motoModel.update(id, motoUpdated);
    return this.createMotoDomain(moto);
  }

  public async delete(id: string) {
    const motoModel = new MotoModel();
    await motoModel.delete(id);
  }
}

export default MotoService;