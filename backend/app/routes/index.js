import {Router as router} from 'express';
import webRoute from './web';

export default (app) => {
  const route = router();

  route.use('/', webRoute);

  app.use('/api/', route);
};
