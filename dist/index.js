import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import config from './config/config.js';
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
app.get('/', (req, res) => {
    console.log(config.mongo.url);
    console.log(config.server.port);
    res.json('Hello world');
});
server.listen(config.server.port, () => {
    console.log(`Server listening on port http://localhost:${config.server.port}/`);
});
