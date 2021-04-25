import {Router as router} from 'express';
import todosRoute from './todos';

export default (middleware) => {
  const route = router();

  route.use('/todos', middleware.auth, todosRoute);

  return route;
};
