import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import compression from 'compression';
import config from './config/config.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
const startServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(compression());
    app.use(cookieParser());
    app.use('/', router());
    const server = http.createServer(app);
    server.listen(config.server.port, () => {
        console.log(`Server listening on port http://localhost:${config.server.port}/`);
    });
};
await mongoose
    .connect(config.mongo.url)
    .then(() => {
    console.log('Connected successfully to MongoDB');
    startServer();
})
    .catch((e) => {
    console.log('Erorr while connecting to MongoDB: ' + e);
});
