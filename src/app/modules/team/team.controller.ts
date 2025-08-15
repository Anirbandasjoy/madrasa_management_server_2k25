import catchAsync from '@/utils/catchAsync';
import { teamService } from './team.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { qb } from '@/app/libs/qb';
import TeamModel, { ITeam } from './team.model';


export const createTeamHandler = catchAsync(async (req, res) => {
  const data = await teamService.createTeam(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team request processed',
    data,
  });
});

export const getTeamHandler = catchAsync(async (_req, res) => {
  const data = await qb<ITeam>(TeamModel);
  console.log(data)
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team request processed',
    data,
  });
});
