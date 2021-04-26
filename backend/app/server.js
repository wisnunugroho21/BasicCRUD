import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import {json, urlencoded} from 'body-parser';
import {createServer} from 'http';
import passport from 'passport';
import session from 'express-session';
import registerRoute from './routes';
import registerMiddleware from './middleware';

const app = express();

app.use(logger('dev'));

app.use(json());
app.use(urlencoded({extended: false}));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

registerMiddleware(app, passport);
registerRoute(app, {
  auth: passport,
});

const server = createServer(app);
server.listen(port);
