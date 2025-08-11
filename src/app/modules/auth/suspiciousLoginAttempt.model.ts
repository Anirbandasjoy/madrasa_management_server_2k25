import { Document, Schema, model, Types } from 'mongoose';

export interface ISuspiciousLoginAttempt extends Document {
  userId: Types.ObjectId;
  ip: string;
  os?: string;
  browser?: string;
  detectedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const suspiciousLoginAttemptSchema = new Schema<ISuspiciousLoginAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ip: { type: String, required: true },
    os: { type: String },
    browser: { type: String },
    detectedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const SuspiciousLoginAttemptModel = model<ISuspiciousLoginAttempt>(
  'SuspiciousLoginAttempt',
  suspiciousLoginAttemptSchema
);
