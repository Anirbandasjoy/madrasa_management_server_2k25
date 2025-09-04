import { Router } from 'express';
import { reviewController } from './review.controller';
import validateRequest from '@/app/middlewares/validateRequest';
import { reviewSchema } from './review.schema';
import { defineRoutes } from '@/utils/defineRoutes';

const reviewRouter = Router();

defineRoutes(reviewRouter, [
  {
    method: 'post',
    path: '/create',
    middlewares: [validateRequest(reviewSchema.createReview)],
    handler: reviewController.createReviewHandler,
  },
  {
    method: 'get',
    path: '/',
    handler: reviewController.getReviewsHandler,
  },
  {
    method: 'get',
    path: '/:id',
    handler: reviewController.getReviewByIdHandler,
  },
  {
    method: 'put',
    path: '/:id',
    handler: reviewController.updateReviewHandler,
  },
  {
    method: 'delete',
    path: '/:id',
    handler: reviewController.deleteReviewHandler,
  },

]);

export default reviewRouter;
