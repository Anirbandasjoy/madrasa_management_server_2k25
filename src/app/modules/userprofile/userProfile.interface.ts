import { Types } from 'mongoose';
import { IUser } from '../user/user.schema';

export type IUserProfile = Pick<IUser, 'name' | 'profilePicture' | 'lastLogin' | 'isActive'> & {
  userId: Types.ObjectId;
};
