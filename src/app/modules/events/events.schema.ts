import { z } from 'zod';

export const createEvents = z.object({
  body: z.object({
    title: z.string({ required_error: 'Events name is required' }),
    description: z.string(),

    images: z
      .array(z.string().url({ message: 'Invalid image URL format' }))
      .nonempty({ message: 'At least one image is required' }),
  }),
});

export const eventsSchema = {
  createEvents,
};

export type IEvents = z.infer<typeof createEvents>['body'];
