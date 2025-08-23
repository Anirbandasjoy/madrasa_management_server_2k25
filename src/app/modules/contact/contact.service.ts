import { IContact } from './contact.schema';
import ContactModel from './contact.model';
import { BadRequestError } from '@/app/errors/apiError';

const createContact = async (payload: IContact) => {
  if (!payload) {
    throw BadRequestError('Payload is required to create a contact');
  }

  const created = await ContactModel.create(payload);
  return created;
};

const getContact = async (id: string, selectedField?: string | null) => {
  if (!id) {
    throw BadRequestError('Contact ID is required to fetch a contact');
  }

  const contact = selectedField
    ? await ContactModel.findById(id).select(selectedField)
    : await ContactModel.findById(id);

  if (!contact) {
    throw BadRequestError(`Contact with ID ${id} not found`);
  }

  return contact;
};

const updateContact = async (
  id: string,
  payload: Partial<IContact>,
  selectedField?: string | null
) => {
  const contact = selectedField
    ? await ContactModel.findByIdAndUpdate(id, payload, { new: true }).select(selectedField)
    : await ContactModel.findByIdAndUpdate(id, payload, { new: true });

  if (!contact) {
    throw BadRequestError(`Contact with ID ${id} not found`);
  }

  return contact;
};

const deleteContact = async (id: string) => {
  const deleted = await ContactModel.findByIdAndDelete(id);
  if (!deleted) {
    throw BadRequestError(`Contact with ID ${id} not found`);
  }
  return deleted;
};

export const contactService = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
