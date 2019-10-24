const { expect } = require('chai');
const fs = require('fs');
const mockFs = require('mock-fs');

const { CarsData } = require('../cars');

describe('cars data tests', () => {

  let carsData;

  const initialCars = [
    {
      "make":"Ford",
      "model":"Fusion Hybrid",
      "year":2019,
      "color":"white",
      "price":25000,
      "id":1
    },
  ];

  beforeEach(() => {
    mockFs({
      'cars.json': JSON.stringify({ cars: initialCars }),
    });

    carsData = new CarsData('cars.json');
  });

  it('should get all cars', () => {

    return carsData.allCars().then(cars => {
      expect(cars).to.deep.equal(initialCars)
    });

  });

  it('should append a car', () => {

      const car = {
        "make":"Tesla",
        "model":"Model S",
        "year":2018,
        "color":"red",
        "price":120000,
      };

    const appendedCar = {
      ...car,
      id: 2,
    };

    return carsData.appendCar(car).then(car => {
      expect(car).to.deep.equal(appendedCar);
    });

  });

  afterEach(() => {
    mockFs.restore();
  });

});