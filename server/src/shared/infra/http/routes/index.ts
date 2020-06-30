import { Router } from 'express';

import deliveriesRouter from '@modules/deliveries/infra/http/routes/deliveries.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import recipientsRouter from '@modules/recipients/infra/http/routes/recipients.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/deliveries', deliveriesRouter);
routes.use('/recipients', recipientsRouter);

export default routes;
