import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { createAPI } from './routes';

mongoose.connect(
  'mongodb://localhost:27017/cartool',
  { useNewUrlParser: true },
);

const CarSchema = new mongoose.Schema({
  id: Number,
  make: String,
  model: String,
  year: Number,
  color: String,
  price: Number,
}, {
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  },
});

const Car = mongoose.model('Car', CarSchema);

const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.json());

app.use(createAPI('cars', Car));

app.listen(port, () => {
  console.log(`REST API Listening on Port: ${port}`);
});
