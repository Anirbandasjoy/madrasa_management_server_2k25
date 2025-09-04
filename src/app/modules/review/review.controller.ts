import catchAsync from '@/utils/catchAsync';
import { reviewService } from './review.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import ReviewModel from './review.model';
import { parseField, parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';


export const createReviewHandler = catchAsync(async (req, res) => {
  const data = await reviewService.createReview(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review created successfully',
    data,
  });
});


export const getReviewsHandler = catchAsync(async (req, res) => {
  let selectedFields = parseFields(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const { meta, data } = await qb(ReviewModel)
    .select(selectedFields)
    .search(req.query.search, ['name', 'designation', 'description'])
    .filter({
      designation: req.query.designation,
    })
    .paginate({
      page: parseInt(req.query.page as string, 10) || 1,
      limit: parseInt(req.query.limit as string, 10) || 10,
    })
    .sort('-createdAt')
    .exec();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Reviews fetched successfully',
    data: { data, meta },
  });
});


export const getReviewByIdHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const review = await reviewService.getReview(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review fetched successfully',
    data: review,
  });
});


export const updateReviewHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    Object.keys(req.body).join(',') as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const review = await reviewService.updateReview(
    req.params.id,
    req.body,
    selectedField
  );

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review updated successfully',
    data: review,
  });
});


export const deleteReviewHandler = catchAsync(async (req, res) => {
  await reviewService.deleteReview(req.params.id);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Review deleted successfully',
  });
});

export const reviewController = {
  createReviewHandler,
  getReviewsHandler,
  getReviewByIdHandler,
  updateReviewHandler,
  deleteReviewHandler,
};
