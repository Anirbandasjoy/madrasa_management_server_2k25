import catchAsync from '@/utils/catchAsync';
import { eventsService } from './events.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { parseField, parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';
import EventsModel from './events.model';
import { EVENTS_STATUS } from './events.constant';

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
  console.log(req.query.limit);

  const { meta, data } = await qb(EventsModel)
    .select(selectedFields)
    .search(req.query.search, ['title', 'description'])
    .filter({ status: req.query.status || EVENTS_STATUS.PUBLISHED })
    .paginate({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    })
    .sort('-createdAt')
    .exec();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Events fetched successfully',
    data: { data, meta },
  });
});

const getEventHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  console.log(selectedField);

  const event = await eventsService.getEvent(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Event fetched successfully',
    data: event,
  });
});

const updateEventHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    Object.keys(req.body).join(',') as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const event = await eventsService.updateEvent(req.params.id, req.body, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Event updated successfully',
    data: event,
  });
});

const deleteEventHandler = catchAsync(async (req, res) => {
  await eventsService.deleteEvent(req.params.id);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Event deleted successfully',
  });
});

export const eventsController = {
  createEventsHandler,
  getEventsHandler,
  getEventHandler,
  deleteEventHandler,
  updateEventHandler,
};
