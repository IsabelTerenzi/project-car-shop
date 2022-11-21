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
}

export default MotoService;