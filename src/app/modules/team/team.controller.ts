import catchAsync from '@/utils/catchAsync';
import { teamService } from './team.service';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import TeamModel from './team.model';
import { parseField, parseFields } from '@/utils/parseFields';
import { qb } from '@/app/libs/qb';

export const createTeamHandler = catchAsync(async (req, res) => {
  const data = await teamService.createTeam(req.body);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team request processed',
    data,
  });
});

export const getTeamHandler = catchAsync(async (req, res) => {
  let selectedFields = parseFields(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined,
    ['password']
  );

  const { meta, data } = await qb(TeamModel)
    .select(selectedFields)
    .search(req.query.search)
    .sort('-createdAt')
    .exec();

  console.log(meta, data);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team request processed',
    data: { data, meta },
  });
});

export const getTeamByIdHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    req.query.fields as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  console.log(selectedField);

  const team = await teamService.getTeam(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team fetched successfully',
    data: team,
  });
});
