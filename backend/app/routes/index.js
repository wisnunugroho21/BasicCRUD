import {Router as router} from 'express';
import webRoute from './web';

export default (app, middleware) => {
  const route = router();

  route.use('/', webRoute(middleware));

  app.use('/api/', route);
};
