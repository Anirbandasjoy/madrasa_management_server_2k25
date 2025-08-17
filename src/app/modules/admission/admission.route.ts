import { Router } from 'express';
import validateRequest from '@/app/middlewares/validateRequest';
import { admissionSchema } from './admission.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import { admissionController } from './admission.controller';
import { authMiddlewares } from '../auth/auth.middleware';
import { USER_ROLES } from '../user/user.constant';

const admissionRouter = Router();

defineRoutes(admissionRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [
      authMiddlewares.isAuthenticated,
      validateRequest(admissionSchema.createAdmission),
      authMiddlewares.hasRole(USER_ROLES.ADMIN),
    ],
    handler: admissionController.addNewClassHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: admissionController.getClassHandler,
  },
  {
    method: 'get',
    path: '/',
    handler: admissionController.getAllClassHandler,
  },
  {
    method: 'delete',
    path: '/:id',
    middlewares: [authMiddlewares.isAuthenticated, authMiddlewares.hasRole(USER_ROLES.ADMIN)],
    handler: admissionController.deleteClassHandler,
  },
  {
    method: 'patch',
    path: '/:id',
    middlewares: [
      authMiddlewares.isAuthenticated,
      authMiddlewares.hasRole(USER_ROLES.ADMIN),
      validateRequest(admissionSchema.updateAdmission),
    ],
    handler: admissionController.updateClassHandler,
  },
]);

export default admissionRouter;
