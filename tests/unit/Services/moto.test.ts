import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotoService from '../../../src/Services/MotoService';
import Motorcycle from '../../../src/Domains/Motorcycle';

const motoHonda = 'Honda Cb 600f Hornet';

describe('Testes da camada Service de Motorcycle', function () {
  afterEach(function () {
    sinon.restore();
  });

  const motoOutputMock: IMotorcycle = {
    id: '6348513f34c397abcad040b2',
    model: motoHonda,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const motoOutputUpdated: IMotorcycle = {
    id: '634852326b35b59438fbea2f',
    model: motoHonda,
    year: 2014,
    color: 'Red',
    status: true,
    buyValue: 45.000,
    category: 'Street',
    engineCapacity: 600,
  };

  it('Testa se é possível cadastrar uma moto', async function () {
    const motoInput: IMotorcycle = {
      model: motoHonda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motoOutput: Motorcycle = new Motorcycle(motoOutputMock);

    sinon.stub(Model, 'create').resolves(motoOutput);
    const service = new MotoService();
    const result = await service.create(motoInput);
    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Testa se é possível listar todas as motos', async function () {
    const motosOutputMock: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: motoHonda,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    const motosOutput: Motorcycle[] = motosOutputMock.map((moto) => new Motorcycle(moto));

    sinon.stub(Model, 'find').resolves(motosOutput);
    const service = new MotoService();
    const result = await service.findAll();
    expect(result).to.be.deep.equal(motosOutput);
  });

  it('Testa se é possível listar uma moto por id', async function () {
    const idInput = '634852326b35b59438fbea2f';
    const motoIdOutputMock: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: motoHonda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motoIdOutput: Motorcycle = new Motorcycle(motoIdOutputMock);

    sinon.stub(Model, 'findById').resolves(motoIdOutput);
    const service = new MotoService();
    const result = await service.findOne(idInput);
    expect(result).to.be.deep.equal(motoIdOutput);
  });

  it('Testa erro ao colocar um id inválido', async function () {
    const idInputInvalid = 'id123';

    sinon.stub(Model, 'findById').resolves({});
    try {
      const service = new MotoService();
      await service.findOne(idInputInvalid);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Testa se é possível atualizar uma moto', async function () {
    const idInput = '634852326b35b59438fbea2f';
    const motoInput: IMotorcycle = {
      model: motoHonda,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motoOutput: Motorcycle = new Motorcycle(motoOutputUpdated);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoOutput);
    const service = new MotoService();
    const result = await service.update(idInput, motoInput);
    expect(result).to.be.deep.equal(motoOutput);
  });
});