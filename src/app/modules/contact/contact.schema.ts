import { z } from 'zod';

const createContact = z.object({
  body: z.object({
    name: z.string({ required_error: 'Contact name is required' }),
    phone: z.string().optional(),
    email: z.string({ required_error: 'Contact email is required' }).email(),
    message: z.string({ required_error: 'Contact message is required' }),
    isRead: z.boolean().optional(),
    isImportant: z.boolean().optional(),
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
