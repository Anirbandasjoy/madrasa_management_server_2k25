import { Router } from 'express';
import userRouter from '@/app/modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import teamRouter from '../modules/team/team.route';
import eventsRouter from '../modules/events/events.router';
<<<<<<< HEAD
import admissionRouter from '../modules/admission/admission.route';
=======
import noticeRouter from '../modules/notice/notice.route';
>>>>>>> dev

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
<<<<<<< HEAD
    path: '/admission',
    router: admissionRouter,
=======
    path: '/team',
    router: teamRouter,
  },
  {
    path: '/notice',
    router: noticeRouter,
>>>>>>> dev
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
