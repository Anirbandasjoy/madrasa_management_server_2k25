import { Router } from 'express';
import { contactController } from './contact.controller';
import validateRequest from '@/app/middlewares/validateRequest';
import { contactSchema } from './contact.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const contactRouter = Router();

defineRoutes(contactRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(contactSchema.createContact)],
    handler: contactController.contactHandler,
  },
  // add other routes as needed
]);

export default contactRouter;
