import { z } from 'zod';

const createAdmission = z.object({
  body: z.object({
    className: z.string({ required_error: 'Class name is required' }),
    admissionOpen: z
      .string({ required_error: 'Admission open date is required' })
      .transform((value) => new Date(value)),
    admissionClose: z
      .string({ required_error: 'Admission close date is required' })
      .transform((value) => new Date(value)),
    isAdmissionOn: z.boolean().default(false).optional(),
  }),
});

// if empty body error show please

const updateAdmission = z.object({
  body: createAdmission.shape.body.partial(),
});

export const admissionSchema = {
  createAdmission,
  updateAdmission,
};

// Type export for mongoose schema
export type IAdmission = z.infer<typeof createAdmission>['body'];
