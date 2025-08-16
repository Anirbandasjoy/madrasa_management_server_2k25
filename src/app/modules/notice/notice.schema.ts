import { z } from 'zod';

const createNotice = z.object({
  body: z.object({
    name: z.string({ required_error: 'Notice name is required' }),
    description: z.string({ required_error: 'Notice description is required' }),
  }),
});


export const noticeSchema = {
  createNotice,

};

// Type export for mongoose schema
export type INotice = z.infer<typeof createNotice>['body'];
