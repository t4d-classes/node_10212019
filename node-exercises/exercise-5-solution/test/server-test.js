const request = require('supertest');
const proxyquire =  require('proxyquire');
const { expect } = require('chai');

describe('server tests', () => {

  it('GET /cars responds with all cars', () => {

    const { createAppServer } = proxyquire('../server', {
      'morgan': () => (req, res, next) => next(),
      './cars': {
        CarsData: class CarsDataMock {
          allCars() {
            return Promise.resolve([
              {
                "make":"Ford",
                "model":"Fusion Hybrid",
                "year":2019,
                "color":"white",
                "price":25000,
                "id":1
              },
            ]);
          }
        },
      }
    });

    return request(createAppServer({ logFile: 'test-history.log' }))
      .get('/cars')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1);
      });
  });

  it('POST /cars responds new car which was added', () => {

    const { createAppServer } = proxyquire('../server', {
      'morgan': () => (req, res, next) => next(),
      './cars': {
        CarsData: class CarsDataMock {
          appendCar(car) {
            expect(car).to.deep.equal(car);
            return Promise.resolve({
              ...car,
              id: 2,
            });
          }
        },
      },
    });

    return request(createAppServer({ logFile: 'test-history.log' }))
      .post('/cars')
      .send({
        "make":"Tesla",
        "model":"Model S",
        "year":2018,
        "color":"red",
        "price":120000,
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(res => {
        expect(res.body).to.deep.equal({
          "make":"Tesla",
          "model":"Model S",
          "year":2018,
          "color":"red",
          "price":120000,
          id: 2,
        });
      });
  });
});