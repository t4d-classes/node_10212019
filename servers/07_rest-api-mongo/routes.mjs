import express from 'express';
import { callbackify } from 'util';

export const createAPI = (resourceName, Model) => {

  const router = express.Router();

  router.route(`/${resourceName}`)
    .get((req, res) => {

      Model.find((err, cars) => {

        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        res.json(cars.map(car => car.toObject()));

      });

    })
    .post((req, res) => {

      const newCar = new Model({
        ...req.body,
      });

      newCar.save((err, car) => {

        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        res.json(car.toObject());
      });

    });

  router.route(`/${resourceName}/:resourceId`)
    .get((req, res) => {

      Model.findOne({ _id: req.params.resourceId }, (err, car) => {

        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        res.json(car.toObject());

      });

    })
    .put((req, res) => {

      Model.findOne({ _id: req.params.resourceId }, (err, car) => {

        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        const oldCar = {
          ...car.toObject(),
        };

        delete req.body.id;

        Model.updateOne(
          { _id: req.params.resourceId },
          Object.assign(car, req.body),
          (err) => {

            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
    
            res.json(oldCar);
    
          });

      });      

    })
    .delete((req, res) => {

      Model.findOne({ _id: req.params.resourceId }, (err, car) => {

        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        Model.deleteOne({ _id: car._id }, (err) => {

          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
  
          res.json(car.toObject());
  
        });
  
      });

    });

  return router;

};
