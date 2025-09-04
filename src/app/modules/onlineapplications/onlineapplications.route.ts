import { Router } from 'express';
import { onlineapplicationsController } from './onlineapplications.controller';
import validateRequest from '@/app/middlewares/validateRequest';
import { onlineapplicationsSchema } from './onlineapplications.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import { authMiddlewares } from '../auth/auth.middleware';
import { USER_ROLES } from '../user/user.constant';

const onlineapplicationsRouter = Router();

defineRoutes(onlineapplicationsRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(onlineapplicationsSchema.createOnlineapplications)],
    handler: onlineapplicationsController.onlineapplicationsCreateHandler,
  },
  {
    method: 'get',
    path: '/',
    middlewares: [authMiddlewares.isAuthenticated,  authMiddlewares.hasRole(USER_ROLES.ADMIN)],
    handler: onlineapplicationsController.getAllOnlineApplicationHandler,
  },
  {
    method: 'get',
    path: '/:id',
    middlewares: [authMiddlewares.isAuthenticated, authMiddlewares.hasRole(USER_ROLES.ADMIN)],
    handler: onlineapplicationsController.getSingleOnlineApplicationHandler,
  },
  {
    method: 'patch',
    path: '/:id',
    middlewares: [
      authMiddlewares.isAuthenticated,
      authMiddlewares.hasRole(USER_ROLES.ADMIN),
      validateRequest(onlineapplicationsSchema.updateOnlineapplications),
    ],
    handler: onlineapplicationsController.onlineApplicationUpdateHandler,
  },
  {
    method: 'delete',
    path: '/:id',
    middlewares: [authMiddlewares.isAuthenticated, authMiddlewares.hasRole(USER_ROLES.ADMIN)],
    handler: onlineapplicationsController.onlineApplicationDeleteHandler,
  },
]);

export default onlineapplicationsRouter;
