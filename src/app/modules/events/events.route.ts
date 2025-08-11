import { Router } from 'express';
import validateRequest from '@/app/middlewares/validateRequest';
import { eventsSchema } from './events.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import { eventsController } from './events.controller';

const eventsRouter = Router();

defineRoutes(eventsRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(eventsSchema.createEvents)],
    handler: eventsController.createEventsHandler,
  },
]);

export default eventsRouter;
