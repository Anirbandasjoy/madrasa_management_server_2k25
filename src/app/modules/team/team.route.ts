import { Router } from 'express';
import { createTeamHandler, getTeamHandler } from './team.controller';
import validateRequest from '@/app/middlewares/validateRequest';
import { teamSchema } from './team.schema';
import { defineRoutes } from '@/utils/defineRoutes';

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
    middlewares: [validateRequest(teamSchema.createTeam)],
    handler: getTeamHandler,
  },
  // add other routes as needed
]);

export default teamRouter;
