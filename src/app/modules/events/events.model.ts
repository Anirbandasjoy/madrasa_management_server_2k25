import { Schema, model, Document } from 'mongoose';
import { IEvents } from './events.schema';
import { EVENTS_STATUS } from './events.constant';

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
    status: {
      type: String,
      enum: Object.values(EVENTS_STATUS),
      default: EVENTS_STATUS.DRAFT,
    },
  },
  { timestamps: true }
);

const EventsModel = model<IEvents & Document>('Events', eventsSchema);
export default EventsModel;
