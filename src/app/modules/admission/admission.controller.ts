import catchAsync from '@/utils/catchAsync';
import { admissionService } from './admission.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { parseField, parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';
import AdmissionModel from './admission.model';

const addNewClassHandler = catchAsync(async (req, res) => {
  const data = await admissionService.createAdmission(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Admission request processed',
    data: {
      _id: data?._id,
    },
  });
});

const getClassHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const data = await admissionService.getAdmission(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Admission request retrieved',
    data,
  });
});

const getAllClassHandler = catchAsync(async (req, res) => {
  const selectedFields = parseFields(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const { meta, data } = await qb(AdmissionModel)
    .select(selectedFields)
    .search(req.query.search, ['className'])
    .filter({ admissionOpen: req.query.admissionOpen, admissionClose: req.query.admissionClose })
    .paginate({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    })
    .sort('-createdAt')
    .exec();

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All admission requests retrieved',
    data: { data, meta },
  });
});

const deleteClassHandler = catchAsync(async (req, res) => {
  await admissionService.deleteAdmission(req.params.id);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Admission request deleted',
  });
});

const updateClassHandler = catchAsync(async (req, res) => {
  const selectedFields = parseField(
    Object.keys(req.body).join(',') as string | undefined,
    req.query.ignoreFields as string | undefined
  );
  const data = await admissionService.updateAdmission(req.params.id, req.body, selectedFields);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Admission request updated',
    data,
  });
});

export const admissionController = {
  addNewClassHandler,
  getClassHandler,
  getAllClassHandler,
  deleteClassHandler,
  updateClassHandler,
};
