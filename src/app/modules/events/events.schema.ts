import { z } from 'zod';

export const createEvents = z.object({
  body: z.object({
    title: z.string({ required_error: 'Events name is required' }),
    description: z.string(),
    images: z.array(z.string()).nonempty({ message: 'At least one image is required' }),
  }),
});

export const eventsSchema = {
  createEvents,
  // updateEvents,
};

export type IEvents = z.infer<typeof createEvents>['body'];
