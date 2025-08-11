import { Document, Schema, model } from 'mongoose';
import { IUserProfile } from './userProfile.interface';
export interface TUserProfile extends Document, IUserProfile {}
const userprofileSchema = new Schema<TUserProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String, required: false },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

const UserprofileModel = model<TUserProfile>('Userprofile', userprofileSchema);
export default UserprofileModel;
