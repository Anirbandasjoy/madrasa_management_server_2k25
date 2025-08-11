import { Schema, model } from 'mongoose';
import { IEvents } from './events.schema';

const eventsSchema = new Schema<IEvents>(
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

const EventsModel = model<IEvents>('Events', eventsSchema);
export default EventsModel;
