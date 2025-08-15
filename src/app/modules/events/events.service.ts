import { IEvents } from './events.schema';
import EventsModel from './events.model';

const createEvents = async (payload: IEvents) => {
  const created = await EventsModel.create(payload);
  return created;
};

const getEvent = async (id: string, selectedField?: string | null) => {
  const event = selectedField
    ? await EventsModel.findById(id).select(selectedField)
    : await EventsModel.findById(id);
  return event;
};

const updateEvent = async (
  id: string,
  payload: Partial<IEvents>,
  selectedField?: string | null
) => {
  const event = selectedField
    ? await EventsModel.findByIdAndUpdate(id, payload, { new: true }).select(selectedField)
    : await EventsModel.findByIdAndUpdate(id, payload, { new: true });
  return event;
};

const deleteEvent = async (id: string) => {
  await EventsModel.findByIdAndDelete(id);
};

export const eventsService = {
  createEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
