import { IEvents } from './events.schema';
import EventsModel from './events.model';

const createEvents = async (payload: IEvents) => {
  const created = await EventsModel.create(payload);
  return created;
};

const getEvent = async (id: string, selectedField?: string | null) => {
  const event = selectedField ? await EventsModel.findById(id).select(selectedField) : await EventsModel.findById(id);
  return event;
};

export const eventsService = {
  createEvents,
  getEvent,
};
