import {Router as router} from 'express';
import TodosController from '../../controllers/todos';

const route = router();

route.post('/', TodosController.create);
route.get('/', TodosController.index);

export default route;
