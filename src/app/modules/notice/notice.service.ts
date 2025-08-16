import { INotice } from './notice.schema';
import NoticeModel from './notice.model';
import { BadRequestError, ConflictError } from '@/app/errors/apiError';

const createNotice = async (payload: INotice) => {
  if(!payload.name || !payload.description) {
    throw new Error('Notice name and description are required');
  }
  const existingNotice = await NoticeModel.findOne({ name: payload.name });

  if (existingNotice) {
    throw ConflictError('Notice with this name already exists');
  }
  const created = await NoticeModel.create(payload);
  return created;
};


const getNoticeById = async (id: string,selectedField?:string|null) => {
  const notice =  selectedField? await NoticeModel.findById(id).select(selectedField) : await NoticeModel.findById(id);
  if (!notice) {
    throw BadRequestError('Notice not found');
  }
  return notice;
};


const updateNotice = async (
  id: string,
  payload: Partial<INotice>,
  selectedField?: string | null
) => {
  const notice = selectedField
    ? await NoticeModel.findByIdAndUpdate(id, payload, { new: true }).select(selectedField)
    : await NoticeModel.findByIdAndUpdate(id, payload, { new: true });
  if (!notice) {
    throw BadRequestError('Notice not found');
  }
  return notice;
};


const deleteNotice = async (id: string) => {
  const notice = await NoticeModel.findByIdAndDelete(id);
  if (!notice) {
    throw BadRequestError('Notice not found');
  }
  return notice;
};



export const noticeService = {
  createNotice,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
