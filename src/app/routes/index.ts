import { Router } from 'express';
import userRouter from '@/app/modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import eventsRouter from '../modules/events/events.router';
import admissionRouter from '../modules/admission/admission.route';

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
  {
    path: '/admission',
    router: admissionRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
