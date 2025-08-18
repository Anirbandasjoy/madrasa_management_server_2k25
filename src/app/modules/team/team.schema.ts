import { z } from 'zod';

const createTeam = z.object({
  body: z.object({
    name: z.string({ required_error: 'Team name is required' }),
    image: z.string({ required_error: 'Team image is required' }),
    designation: z.string({ required_error: 'Team designation is required' }),
    description: z.string({ required_error: 'Team description is required' }),
    status: z.enum(['Managing Committee', 'Teachers', 'Staff'], {
      required_error: 'Team status is required',
    }),
    educationQualifications: z.array(z.string(), { required_error: 'Education qualifications are required' }),
    othersInfo: z.array(z.object({
      label: z.string({ required_error: 'Label is required' }),
      value: z.string({ required_error: 'Value is required' }),
    }), { required_error: 'Others info is required' }),
  }),
});


export const teamSchema = {
  createTeam,
};

export type ITeam = z.infer<typeof createTeam>['body'];
