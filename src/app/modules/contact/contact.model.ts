import { Schema, model, Document } from 'mongoose';
import { IContact } from './contact.schema';

const contactSchema = new Schema<IContact & Document>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ContactModel = model<IContact & Document>('Contact', contactSchema);
export default ContactModel;
