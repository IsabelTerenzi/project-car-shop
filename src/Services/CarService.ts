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

  public async findAll() {
    const carModel = new CarModel();
    const cars = await carModel.findAll();
    const carsArr = cars.map((car) => this.createCarDomain(car));
    return carsArr;
  }

  public async findOne(id: string) {
    const carModel = new CarModel();
    const car = await carModel.findOne(id);
    return this.createCarDomain(car); 
  }

  public async update(id: string, carUpdated: ICar) {
    const carModel = new CarModel();
    const car = await carModel.update(id, carUpdated);
    return this.createCarDomain(car);
  }
}

export default CarService;