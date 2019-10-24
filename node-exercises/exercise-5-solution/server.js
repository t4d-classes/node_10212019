const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const { CarsData } = require('./cars');

module.exports.createAppServer = (config) => {

  const carsData = new CarsData(config.dataFile);

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, config.logFile),
    { flags: 'a' }
  );


  const app = express();

  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream: accessLogStream
    })
  );

  app.use(bodyParser.json());

  app.get('/cars', (req, res) => {

    carsData.allCars().then(cars => res.json(cars));

  })

  app.post('/cars', (req, res) => {

    carsData.appendCar(req.body).then(car => res.json(car));

  })

  return app;

};

