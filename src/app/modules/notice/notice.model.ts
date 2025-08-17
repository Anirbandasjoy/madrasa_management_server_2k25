import { Document, Schema, model } from 'mongoose';
import { INotice } from './notice.schema';

const noticeSchema = new Schema<INotice & Document>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const NoticeModel = model<INotice & Document>('Notice', noticeSchema);
export default NoticeModel;
