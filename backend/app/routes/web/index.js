import {Router as router} from 'express';
import todosRoute from './todos';

const route = router();

route.use('/todos', todosRoute);

export default route;
