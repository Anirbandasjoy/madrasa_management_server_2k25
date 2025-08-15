import { z } from 'zod';

export const createTeam = z.object({
  body: z.object({
    name: z.string({ required_error: 'Team name is required' }),
    designation: z.string({ required_error: 'Designation is required' }),
    image: z.string({ required_error: 'Image URL is required' }),
    description: z.string({ required_error: 'Description is required' }),
  }),
});



export const teamSchema = {
  createTeam,

};

// Type export for mongoose schema
export type TeamInput = z.infer<typeof createTeam>['body'];
