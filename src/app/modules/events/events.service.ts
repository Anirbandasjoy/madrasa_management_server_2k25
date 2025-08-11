import { IEvents } from './events.schema';
import EventsModel from './events.model';

const createEvents = async (payload: IEvents) => {
  const created = await EventsModel.create(payload);
  return created;
};

export const eventsService = {
  createEvents,
};
