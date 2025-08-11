import { Router } from 'express';
import { defineRoutes } from '@/utils/defineRoutes';
import { userProfileController } from './userprofile.controller';
import { userValidationSchema } from '../user/user.schema';

const userprofileRouter = Router();

defineRoutes(userprofileRouter, [
  {
    method: 'put',
    path: '/userProfile-update',
    middlewares: [userValidationSchema.UserUpdateSchema],
    handler: userProfileController.updateUserProfile,
  },
  {
    method: 'patch',
    path: '/userProfile-activation/:userId',
    middlewares: [userValidationSchema.UserUpdateSchema],
    handler: userProfileController.userAccountActivationDeactivation,
  },
  // add other routes as needed
]);

export default userprofileRouter;
