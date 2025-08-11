import { NotFoundError } from '@/app/errors/apiError';
import { IUserProfile } from './userProfile.interface';
import UserprofileModel from './userprofile.model';

const updateUserProfile = async (profileData: IUserProfile) => {
  const { userId } = profileData;
  const updatedProfile = await UserprofileModel.findOneAndUpdate({ userId }, profileData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProfile) {
    throw NotFoundError(`User profile with userId ${userId} not found`);
  }

  return updatedProfile;
};

const userAccountActivationDeactivation = async (userId: string, isActive: boolean) => {
  const updatedProfile = await UserprofileModel.findOneAndUpdate(
    { userId },
    { isActive },
    { new: true, runValidators: true }
  ).select('isActive');
  if (!updatedProfile) {
    throw NotFoundError(`User profile with userId ${userId} not found`);
  }
  return updatedProfile;
};

export const userProfileService = {
  updateUserProfile,
  userAccountActivationDeactivation,
};
