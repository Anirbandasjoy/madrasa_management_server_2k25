import { Router } from 'express';

import validateRequest from '@/app/middlewares/validateRequest';
import { contactSchema } from './contact.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import {
  createContactHandler,
  deleteContactHandler,
  getContactByIdHandler,
  getContactsHandler,
  updateContactHandler,
} from './contact.controller';

const contactRouter = Router();

defineRoutes(contactRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(contactSchema.createContact)],
    handler: createContactHandler,
  },
  {
    method: 'get',
    path: '/',
    handler: getContactsHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: getContactByIdHandler,
  },
  {
    method: 'put',
    path: '/:id',
    handler: updateContactHandler,
  },
  {
    method: 'delete',
    path: '/:id',
    handler: deleteContactHandler,
  },

  // add other routes as needed
]);

export default contactRouter;
