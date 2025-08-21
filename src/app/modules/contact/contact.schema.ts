import { z } from 'zod';

const createContact = z.object({
  body: z.object({
    name: z.string({ required_error: 'Contact name is required' }),
  }),
});

// Add other schemas here as needed
// export const updateContact = z.object({...});

export const contactSchema = {
  createContact,
  // updateContact,
};

// Type export for mongoose schema
export type IContact = z.infer<typeof createContact>['body'];
