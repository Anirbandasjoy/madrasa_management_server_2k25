import { Router } from 'express';
import userRouter from '@/app/modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import teamRouter from '../modules/team/team.route';
import eventsRouter from '../modules/events/events.router';
import admissionRouter from '../modules/admission/admission.route';
import noticeRouter from '../modules/notice/notice.route';
import contactRouter from '../modules/contact/contact.route';
import onlineapplicationsRouter from '../modules/onlineapplications/onlineapplications.route';

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
  {
    path: '/team',
    router: teamRouter,
  },

  {
    path: '/notice',
    router: noticeRouter,
  },
  {
    path: '/contact',
    router: contactRouter,
  },
  {
    path: '/onlineapplications',
    router: onlineapplicationsRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
