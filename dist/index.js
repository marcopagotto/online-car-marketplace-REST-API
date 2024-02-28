import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const PORT = 3000;
app.get('/', (req, res) => {
    res.json('Hello world');
});
server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
});
