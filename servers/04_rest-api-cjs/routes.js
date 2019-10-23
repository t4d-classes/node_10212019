const express = require('express');

module.exports.createAPI = (resourceName, db) => {

  let lastId = db.get(resourceName).last().value().id;

  const router = express.Router();

  router.route(`/${resourceName}`)
    .get((req, res) => {

      const resources = db
        .get(resourceName)
        .value();

      res.json(resources);
    })
    .post((req, res) => {

      db
        .get(resourceName)
        .push({
          ...req.body,
          id: ++lastId,
        })
        .write()
        .then((resource) => {
          res.json(resource);
        });

    });

  router.route(`/${resourceName}/:resourceId`)
    .get((req, res) => {

      const resource = db
        .get(resourceName)
        .find({ id: Number(req.params.resourceId) })
        .value();

      res.json(resource);
    })
    .put((req, res) => {

      db
        .get(resourceName)
        .remove({ id: Number(req.params.resourceId) })
        .write()
        .then((oldResource) => {

          return db
            .get(resourceName)
            .push({
              ...req.body,
              id: Number(req.params.resourceId),
            })
            .write()
            .then(() => {
              res.json(oldResource);
            });

        });

    })
    .delete((req, res) => {

      db
        .get(resourceName)
        .remove({ id: Number(req.params.resourceId) })
        .write()
        .then((resource) => {
          res.json(resource[0]);
        });

    });

  return router;

};
