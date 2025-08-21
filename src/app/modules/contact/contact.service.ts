import { IContact } from './contact.schema';
import ContactModel from './contact.model';

const createContact = async (payload: IContact) => {
  const created = await ContactModel.create(payload);
  return created;
};

export const contactService = {
  createContact,
};
