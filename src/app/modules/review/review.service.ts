import { IReview } from './review.schema';
import ReviewModel from './review.model';
import { BadRequestError } from '@/app/errors/apiError';

const createReview = async (payload: IReview) => {
  if (!payload) {
    throw new Error('Payload is required to create a review');
  }
  const created = await ReviewModel.create(payload);
  return created;
};

const getReview = async (id: string, selectedField?: string | null) => {
  if (!id) {
    throw BadRequestError('Review ID is required to fetch a review');
  }
  const review = selectedField
    ? await ReviewModel.findById(id).select(selectedField)
    : await ReviewModel.findById(id);

  if (!review) {
    throw BadRequestError(`Review with ID ${id} not found`);
  }
  return review;
};

const updateReview = async (
  id: string,
  payload: Partial<IReview>,
  selectedField?: string | null
) => {
  const review = selectedField
    ? await ReviewModel.findByIdAndUpdate(id, payload, { new: true }).select(selectedField)
    : await ReviewModel.findByIdAndUpdate(id, payload, { new: true });

  return review;
};

const deleteReview = async (id: string) => {
  await ReviewModel.findByIdAndDelete(id);
};

export const reviewService = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
