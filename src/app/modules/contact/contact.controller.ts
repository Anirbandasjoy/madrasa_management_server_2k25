import catchAsync from '@/utils/catchAsync';
import { contactService } from './contact.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';

export const contactHandler = catchAsync(async (req, res) => {
  const data = await contactService.createContact(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Contact request processed',
    data,
  });
});

export const contactController = {
  contactHandler,
};

