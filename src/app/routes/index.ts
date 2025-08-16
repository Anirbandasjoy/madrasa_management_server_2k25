import { Router } from 'express';
import userRouter from '@/app/modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import teamRouter from '../modules/team/team.route';
import eventsRouter from '../modules/events/events.router';
import noticeRouter from '../modules/notice/notice.route';

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
    path: '/team',
    router: teamRouter,
  },
  {
    path: '/notice',
    router: noticeRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
