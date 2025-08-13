import catchAsync from '@/utils/catchAsync';
import { eventsService } from './events.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';
import EventsModel from './events.model';

const createEventsHandler = catchAsync(async (req, res) => {
  const data = await eventsService.createEvents(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Events request processed',
    data,
  });
});

const getEventsHandler = catchAsync(async (req, res) => {
  let selectedFields = parseFields(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined,
    ['password']
  );

  const { meta, data } = await qb(EventsModel)
    .select(selectedFields)
    .search(req.query.search, ['title', 'description'])
    .sort('-createdAt')
    .exec();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Events fetched successfully',
    data: { data, meta },
  });
});

export const eventsController = {
  createEventsHandler,
  getEventsHandler,
};
