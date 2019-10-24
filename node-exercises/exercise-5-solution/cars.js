const fs = require('fs');

module.exports.CarsData = class {

  constructor(carDataFileName) {
    this._carDataFileName = carDataFileName;
  }

  allCars() {

    return new Promise((resolve, reject) => {
      fs.readFile(this._carDataFileName, 'utf8', (err, data) => {

        if (err) {
          reject(err);
          return;
        }

        resolve(JSON.parse(data).cars);

      });    
    });

  }

  appendCar(car) {

    return this.allCars().then((cars ) => {

      const newCar = {
        ...car,
        id: Math.max(...cars.map(c => c.id), 0) + 1,
      };

      const newCars = cars.concat(newCar);

      return new Promise((resolve, reject) => {
        fs.writeFile(this._carDataFileName, JSON.stringify({ cars: newCars }, null, 2), 'utf8', (err) => {
  
          if (err) {
            reject(err);
            return;
          }
  
          resolve(newCar);
  
        });    
      });

    });

  }

};