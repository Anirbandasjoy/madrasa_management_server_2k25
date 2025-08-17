import { z } from 'zod';

const createTeam = z.object({
  body: z.object({
    name: z.string({ required_error: 'Team name is required' }),
    image: z.string({ required_error: 'Team image is required' }),
    designation: z.string({ required_error: 'Team designation is required' }),
    description: z.string({ required_error: 'Team description is required' }),
  }),
});


export const teamSchema = {
  createTeam,
};

export type ITeam = z.infer<typeof createTeam>['body'];
