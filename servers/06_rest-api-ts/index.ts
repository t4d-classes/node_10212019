import express from 'express';
import bodyParser from 'body-parser';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileAsync';
import cors from 'cors';

import { createAPI } from './routes';

const adapter = new FileSync('db.json');
const dbJSON = low(adapter);

dbJSON.then((db) => {

  const app = express();
  const port = 3010;

  app.use(cors());
  app.use(bodyParser.json());

  Object.keys(db.getState()).forEach((resourceName: string) => {
    app.use(createAPI(resourceName, db));
  });

  app.listen(port, () => {
    console.log(`REST API Listening on Port: ${port}`);
  });

});
