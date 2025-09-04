import catchAsync from '@/utils/catchAsync';
import { onlineapplicationsService } from './onlineapplications.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { qb } from '@/app/libs/qb';
import OnlineapplicationsModel from './onlineapplications.model';
import { parseFields } from '@/utils/parseFields';
import { NotFoundError } from '@/app/errors/apiError';

export const onlineapplicationsCreateHandler = catchAsync(async (req, res) => {
  const data = await onlineapplicationsService.createOnlineapplications(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Onlineapplications request processed',
    data,
  });
});

export const getAllOnlineApplicationHandler = catchAsync(async (req, res) => {
  let selectedFields = parseFields(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined,
    ['password']
  );
  const { data, meta } = await qb(OnlineapplicationsModel)
    .filter({
      applicationStatus: req.query.status,
      gender: req.query.gender,
      maritalStatus: req.query.maritalStatus,
      religion: req.query.religion,
    })
    .select(selectedFields)
    .search(req.query.search, [
      'studentNameBangla',
      'studentNameEnglish',
      'birthRegistrationNumber',
      'phoneNumber',
      'rollNumber',
      'presentAddress',
      'permanentAddress',
    ])
    .sort('-createdAt')
    .paginate({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    })
    .exec();
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Onlineapplications fetched successfully',
    data: {
      meta,
      data,
    },
  });
});

export const getSingleOnlineApplicationHandler = catchAsync(async (req, res) => {
  const onlineapplication = await onlineapplicationsService.getSingleOnlineApplication(
    req.params.id
  );
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Onlineapplication fetched successfully',
    data: onlineapplication,
  });
});

export const onlineApplicationUpdateHandler = catchAsync(async (req, res) => {
  const onlineapplication = await OnlineapplicationsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!onlineapplication) {
    throw NotFoundError('Onlineapplication not found');
  }
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Onlineapplication updated successfully',
    data: onlineapplication,
  });
});

export const onlineApplicationDeleteHandler = catchAsync(async (req, res) => {
  const onlineapplication = await OnlineapplicationsModel.findByIdAndDelete(req.params.id);
  if (!onlineapplication) {
    throw NotFoundError('Onlineapplication not found');
  }
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Onlineapplication deleted successfully',
  });
});

export const onlineapplicationsController = {
  onlineapplicationsCreateHandler,
  getAllOnlineApplicationHandler,
  getSingleOnlineApplicationHandler,
  onlineApplicationUpdateHandler,
  onlineApplicationDeleteHandler,
};
