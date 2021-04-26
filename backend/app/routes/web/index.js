import {Router as router} from 'express';
import todosRoute from './todos';

export default (middleware) => {
  const route = router();

  route.use('/todos', todosRoute);

  route.post('/login', middleware.auth.authenticate('local-signin', {
    successRedirect: '/api/todos',
  }));
  route.post('/signup', middleware.auth.authenticate('local-signup', {
    successRedirect: '/api/todos',
  }));

  return route;
};
