import { Schema, model, Document } from 'mongoose';
import { IContact } from './contact.schema';

const contactSchema = new Schema<IContact & Document>({
  name: { type: String, required: true },
}, { timestamps: true });

const ContactModel = model<IContact & Document>('Contact', contactSchema);
export default ContactModel;
