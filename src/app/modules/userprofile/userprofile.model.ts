import { Schema, model } from 'mongoose';
import { IUserProfile } from './userProfile.interface';

const userprofileSchema = new Schema<IUserProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String, required: false },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

const UserprofileModel = model<IUserProfile>('Userprofile', userprofileSchema);
export default UserprofileModel;
