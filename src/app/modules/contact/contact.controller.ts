import catchAsync from '@/utils/catchAsync';
import { contactService } from './contact.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { parseField, parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';
import ContactModel from './contact.model';

export const createContactHandler = catchAsync(async (req, res) => {
  const data = await contactService.createContact(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Contact message sent successfully',
    data,
  });
});

export const getContactsHandler = catchAsync(async (req, res) => {
  console.log('Fetching contacts with query:', req.query);
  let selectedFields = parseFields(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined,
    []
  );

  const { meta, data } = await qb(ContactModel)
    .select(selectedFields)
    .search(req.query.search,['name', 'email'])
    .filter({
      isImportant: req.query.isImportant,
      isRead: req.query.isRead,
    })
    .paginate({
      page: parseInt(req.query.page as string, 10) || 1,
      limit: parseInt(req.query.limit as string, 10) || 10,
    })
    .sort('-createdAt')
    .exec();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Contacts fetched successfully',
    data: { data, meta },
  });
});

export const getContactByIdHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const contact = await contactService.getContact(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Contact fetched successfully',
    data: contact,
  });
});

export const updateContactHandler = catchAsync(async (req, res) => {
  console.log(req.query);
  const selectedField = parseField(
    Object.keys(req.body).join(',') as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const contact = await contactService.updateContact(req.params.id, req.body, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Contact updated successfully',
    data: contact,
  });
});

export const deleteContactHandler = catchAsync(async (req, res) => {
  await contactService.deleteContact(req.params.id);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Contact deleted successfully',
  });
});
