import { Router } from 'express';

import DeliveriesController from '@modules/deliveries/infra/http/controllers/deliveriesController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const deliveriesController = new DeliveriesController();

const deliveriesRouter = Router();

deliveriesRouter.use(ensureAuthentication);
deliveriesRouter.post('/', deliveriesController.create);
deliveriesRouter.get('/', deliveriesController.index);
deliveriesRouter.delete('/:id', deliveriesController.destroy);

export default deliveriesRouter;
