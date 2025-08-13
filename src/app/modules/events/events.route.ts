import { Router } from 'express';
import validateRequest from '@/app/middlewares/validateRequest';
import { eventsSchema } from './events.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import { eventsController } from './events.controller';
import { authMiddlewares } from '../auth/auth.middleware';
import { USER_ROLES } from '../user/user.constant';

const eventsRouter = Router();

defineRoutes(eventsRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [
      authMiddlewares.isAuthenticated,
      authMiddlewares.hasRole(USER_ROLES.ADMIN),
      validateRequest(eventsSchema.createEvents),
    ],
    handler: eventsController.createEventsHandler,
  },
  {
    method: 'get',
    path: '/',
    handler: eventsController.getEventsHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: eventsController.getEventHandler,
  },
]);

export default eventsRouter;
