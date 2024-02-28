import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';

import config from './config/config.js';

const startServer = () => {
  const app: express.Application = express();

  app.use(bodyParser.json());

  const server: http.Server = http.createServer(app);

  server.listen(config.server.port, () => {
    console.log(
      `Server listening on port http://localhost:${config.server.port}/`
    );
  });
};

await mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    startServer();
  })
  .catch((e: Error) => {
    console.log('Erorr while connecting to MongoDB: ' + e);
  });