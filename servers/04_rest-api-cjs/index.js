const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileAsync');
const cors = require('cors');

const { createAPI } = require('./routes');

const adapter = new FileSync('db.json');
const dbJSON = low(adapter);

dbJSON.then((db) => {

  const app = express();
  const port = 3010;

  app.use(cors());
  app.use(bodyParser.json());

  Object.keys(db.getState()).forEach((resourceName) => {
    app.use(createAPI(resourceName, db));
  });

  app.listen(port, () => {
    console.log(`REST API Listening on Port: ${port}`);
  });

});
