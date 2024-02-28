import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';

import config from './config/config.js';

const app: express.Application = express();

app.use(bodyParser.json());

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((e) => {
    console.log('Erorr while connecting to MongoDB: '+ e);
  });

const server: http.Server = http.createServer(app);

app.get('/', (req: express.Request, res: express.Response) => {
  console.log(config.mongo.url);
  console.log(config.server.port);
  res.json('Hello world');
});

server.listen(config.server.port, () => {
  console.log(
    `Server listening on port http://localhost:${config.server.port}/`
  );
});
