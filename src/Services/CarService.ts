import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carModel = new CarModel();
    const newCar = await carModel.create(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;