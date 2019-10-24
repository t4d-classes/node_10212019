const request = require('supertest');
const proxyquire =  require('proxyquire');
const { expect } = require('chai');

const getProxiedServer = (CarsData) => {

  return proxyquire('../server', {
    // path, fs, and morgan are proxied because they are not under text
    'path': {
      join: () => null,
    },  
    'fs': {
      createWriteStream: () => null,
    },  
    'morgan': () => (req, res, next) => next(),
    // a mock version of CarsData will be provided for testing
    './cars': {
      CarsData,
    },
  });

};

describe('server tests', () => {

  it('GET /cars responds with all cars', () => {

    const { createAppServer } = getProxiedServer(class {
      allCars() {
        return Promise.resolve([{
          make: 'Ford',
          model: 'Fusion Hybrid',
          year: 2019,
          color: 'white',
          price: 25000,
          id: 1,
        }]);
      }
    });

    return request(createAppServer({}))
      .get('/cars')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1);
      });
  });

  it('POST /cars responds new car which was added', () => {

    const car = {
      make: 'Tesla',
      model: 'Model S',
      year: 2018,
      color: 'red',
      price: 120000,
    };

    const { createAppServer } = getProxiedServer(class {
      appendCar(car) {
        expect(car).to.deep.equal(car);
        return Promise.resolve({
          ...car,
          id: 2,
        });
      }
    });  

    return request(createAppServer({}))
      .post('/cars')
      .send(car)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(res => {
        expect(res.body).to.deep.equal({
          ...car,
          id: 2,
        });
      });
  });
});