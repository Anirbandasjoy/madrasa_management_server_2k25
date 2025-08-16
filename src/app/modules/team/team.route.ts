import { Router } from 'express';

import validateRequest from '@/app/middlewares/validateRequest';
import { teamSchema } from './team.schema';
import { defineRoutes } from '@/utils/defineRoutes';
import { createTeamHandler, getTeamByIdHandler, getTeamHandler } from './team.controller';

const teamRouter = Router();

defineRoutes(teamRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(teamSchema.createTeam)],
    handler: createTeamHandler,
  },
  {
    method: 'get',
    path: '/',
    handler: getTeamHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: getTeamByIdHandler,
  },
  // add other routes as needed
]);

export default teamRouter;
