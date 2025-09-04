import { Schema, model, Document } from 'mongoose';
import { IReview } from './review.schema';

const reviewSchema = new Schema<IReview & Document>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = model<IReview & Document>('Review', reviewSchema);
export default ReviewModel;
