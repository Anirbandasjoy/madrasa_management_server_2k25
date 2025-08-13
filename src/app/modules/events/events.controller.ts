import catchAsync from '@/utils/catchAsync';
import { eventsService } from './events.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';

const createEventsHandler = catchAsync(async (req, res) => {
  const data = await eventsService.createEvents(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Events request processed',
    data,
  });
});

export const eventsController = {
  createEventsHandler,
};
