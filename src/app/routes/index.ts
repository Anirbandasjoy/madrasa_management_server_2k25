import { Router } from 'express';
import userRouter from '@/app/modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import eventsRouter from '../modules/events/events.route';

const router = Router();

const routes = [
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/events',
    router: eventsRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
