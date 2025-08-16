import { Router } from 'express';
import { deleteNoticeHandler, getNoticeByIdHandler, getNoticeHandler, noticeHandler, updateNoticeHandler } from './notice.controller';
import validateRequest from '@/app/middlewares/validateRequest';
import { noticeSchema } from './notice.schema';
import { defineRoutes } from '@/utils/defineRoutes';


const noticeRouter = Router();

defineRoutes(noticeRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(noticeSchema.createNotice)],
    handler: noticeHandler,
  },
  {
    method: 'get',
    path: '/',
    handler: getNoticeHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: getNoticeByIdHandler,
  },
  {
    method: 'put',
    path: '/:id',
    handler: updateNoticeHandler,
  },
  {
    method: 'delete',
    path: '/:id',
    handler: deleteNoticeHandler,
  },
  // add other routes as needed
]);

export default noticeRouter;
