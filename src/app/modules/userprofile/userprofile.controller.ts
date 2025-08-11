import catchAsync from '@/utils/catchAsync';
import { userProfileService } from './userprofile.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';

const updateUserProfile = catchAsync(async (req, res) => {
  const profileData = req.body;
  const userId = req.user._id;
  profileData.userId = userId;
  const updatedProfile = await userProfileService.updateUserProfile(profileData);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User profile updated successfully',
    data: updatedProfile,
  });
});

const userAccountActivationDeactivation = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;
  const updatedProfile = await userProfileService.userAccountActivationDeactivation(
    userId,
    isActive
  );

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User account activation/deactivation status updated successfully',
    data: updatedProfile,
  });
});

export const userProfileController = {
  updateUserProfile,
  userAccountActivationDeactivation,
};
