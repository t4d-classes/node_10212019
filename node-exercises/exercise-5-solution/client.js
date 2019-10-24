const superagent = require('superagent');

const cars = [
  {
    "make": "Ford",
    "model": "Fusion Hybrid",
    "year": 2019,
    "color": "white",
    "price": 25000
  },
  {
    "make": "Tesla",
    "model": "S",
    "year": 2018,
    "color": "red",
    "price": 125000
  }
];

superagent
  .post('http://localhost:8080/cars')
  .send(cars[0])
  .then(() => {
    return superagent
     .post('http://localhost:8080/cars')
    .send(cars[1]);
  }).then(() => {
    return superagent
     .get('http://localhost:8080/cars')
  }).then(res => console.log(res.body));
