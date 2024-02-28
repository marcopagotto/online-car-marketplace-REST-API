import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

const app: express.Application = express();

app.use(bodyParser.json());

const server: http.Server = http.createServer(app);

const PORT = 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.json('Hello world');
});

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}/`);
});
