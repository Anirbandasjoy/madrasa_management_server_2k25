import { Schema, model, Document } from 'mongoose';
import { IEvents } from './events.schema';

const eventsSchema = new Schema<IEvents & Document>(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const EventsModel = model<IEvents & Document>('Events', eventsSchema);
export default EventsModel;
