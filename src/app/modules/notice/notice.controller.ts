import catchAsync from '@/utils/catchAsync';
import { noticeService } from './notice.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { parseField, parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';
import NoticeModel from './notice.model';

export const noticeHandler = catchAsync(async (req, res) => {
  const data = await noticeService.createNotice(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Notice request processed',
    data,
  });
});

export const getNoticeHandler = catchAsync(async (req, res) => {
  let selectedFields = parseFields(
      req.query.fields as string | undefined,
      req.query.ignoreFields as string | undefined,
      ['password']
    );
  const {meta,data} = await qb(NoticeModel)
    .select(selectedFields)
    .search(req.query.search, ['name', 'description'])
    .paginate({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    })
    .sort('-createdAt')
    .exec();
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Notice retrieved successfully',
    data:{ data, meta },
  });
});


export const getNoticeByIdHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined,
  );

  const notice = await noticeService.getNoticeById(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Notice fetched successfully',
    data: notice,
  });
});


export const updateNoticeHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined,
  );

  const notice = await noticeService.updateNotice(req.params.id, req.body, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Notice updated successfully',
    data: notice,
  });
}); 


export const deleteNoticeHandler = catchAsync(async (req, res) => {
  const notice = await noticeService.deleteNotice(req.params.id);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Notice deleted successfully',
    data: notice,
  });
});