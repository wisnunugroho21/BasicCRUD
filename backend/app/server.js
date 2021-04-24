import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import {json, urlencoded} from 'body-parser';
import {createServer} from 'http';
import registerRoute from './routes';

const app = express();

app.use(logger('dev'));

app.use(json());
app.use(urlencoded({extended: false}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

registerRoute(app);
app.get('*', (req, res) => res.status(404).send({
  message: 'Wrong API',
}));

const server = createServer(app);
server.listen(port);
