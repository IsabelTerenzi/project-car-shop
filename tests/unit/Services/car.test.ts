import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Testes da camada Service de Car', function () {
  afterEach(function () {
    sinon.restore();
  });

  const carOutputMock = {
    id: '6377edd4c3bdb609d17eae9b',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  const carOutputUpdated = {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 1992,
    color: 'Red',
    status: true,
    buyValue: 12.000,
    doorsQty: 2,
    seatsQty: 5,
  };

  it('Testa se é possível cadastrar um carro', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput: Car = new Car(carOutputMock);

    sinon.stub(Model, 'create').resolves(carOutput);
    const service = new CarService();
    const result = await service.create(carInput);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Testa se é possível listar todos os carros', async function () {
    const carsOutputMock = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    const carsOutput: Car[] = carsOutputMock.map((car) => new Car(car));

    sinon.stub(Model, 'find').resolves(carsOutput);
    const service = new CarService();
    const result = await service.findAll();
    expect(result).to.be.deep.equal(carsOutput);
  });

  it('Testa se é possível listar um carro por id', async function () {
    const idInput = '6377edd4c3bdb609d17eae9b';
    const carIdOutputMock = {
      id: '6377edd4c3bdb609d17eae9b',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carIdOutput: Car = new Car(carIdOutputMock);

    sinon.stub(Model, 'findById').resolves(carIdOutput);
    const service = new CarService();
    const result = await service.findOne(idInput);
    expect(result).to.be.deep.equal(carIdOutput);
  });

  it('Testa erro ao colocar um id inválido', async function () {
    const idInputInvalid = 'id123';

    sinon.stub(Model, 'findById').resolves({});
    try {
      const service = new CarService();
      await service.findOne(idInputInvalid);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Testa se é possível atualizar um carro', async function () {
    const idInput = '6377edd4c3bdb609d17eae9b';
    const carInput: ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const carOutput: Car = new Car(carOutputUpdated);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
    const service = new CarService();
    const result = await service.update(idInput, carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
});