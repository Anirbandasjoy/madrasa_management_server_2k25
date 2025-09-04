import { z } from 'zod';

const createReview = z.object({
  body: z.object({
    name: z.string({ required_error: 'Review name is required' }),
    image: z.string({ required_error: 'Review image is required' }),
    designation: z.string({ required_error: 'Review designation is required' }),
    description: z.string({ required_error: 'Review description is required' }),
  }),
  
});

// Add other schemas here as needed
// export const updateReview = z.object({...});

export const reviewSchema = {
  createReview,
  // updateReview,
};

// Type export for mongoose schema
export type IReview = z.infer<typeof createReview>['body'];
