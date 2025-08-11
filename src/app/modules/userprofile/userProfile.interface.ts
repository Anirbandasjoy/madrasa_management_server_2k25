import { IUsers } from '../user/user.schema';
import { Types } from 'mongoose';

export type IUserProfile = Pick<IUsers, 'name' | 'profilePicture' | 'lastLogin' | 'isActive'> & {
  userId: Types.ObjectId;
};
