import { Router } from 'express';
import validateRequest from '@/app/middlewares/validateRequest';
import { eventsSchema } from './events.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import { eventsController } from './events.controller';
import { authMiddlewares } from '../auth/auth.middleware';
import { USER_ROLES } from '../user/user.constant';
import { loginLimiter } from '@/utils/loginLimiter';

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
    middlewares: [loginLimiter],
    handler: eventsController.getEventsHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: eventsController.getEventHandler,
  },
  {
    method: 'patch',
    path: '/:id',
    middlewares: [
      authMiddlewares.isAuthenticated,
      authMiddlewares.hasRole(USER_ROLES.ADMIN),
      validateRequest(eventsSchema.updateEvents),
    ],
    handler: eventsController.updateEventHandler,
  },
  {
    method: 'delete',
    path: '/:id',
    middlewares: [authMiddlewares.isAuthenticated, authMiddlewares.hasRole(USER_ROLES.ADMIN)],
    handler: eventsController.deleteEventHandler,
  },
]);

export default eventsRouter;
