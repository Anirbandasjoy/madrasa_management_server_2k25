import { z } from 'zod';
import { EVENTS_STATUS } from './events.constant';

export const createEvents = z.object({
  body: z.object({
    title: z.string({ required_error: 'Events name is required' }),
    description: z.string(),
    images: z
      .array(z.string().url({ message: 'Invalid image URL format' }))
      .nonempty({ message: 'At least one image is required' }),
    status: z
      .enum(Object.values(EVENTS_STATUS) as [string, ...string[]])
      .default(EVENTS_STATUS.DRAFT),
  }),
});

export const eventsSchema = {
  createEvents,
};

export type IEvents = z.infer<typeof createEvents>['body'];
