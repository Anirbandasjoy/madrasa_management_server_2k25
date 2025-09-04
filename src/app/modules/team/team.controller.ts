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
    .search(req.query.search,['name','designation','description',"status"])
    .filter({
      status: req.query.status,
    })
    .paginate({
      page: parseInt(req.query.page as string, 10) || 1,
      limit: parseInt(req.query.limit as string, 10) || 10,
    })
    .sort('-createdAt')
    .exec();

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


  const team = await teamService.getTeam(req.params.id, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team fetched successfully',
    data: team,
  });
});



export const updateTeamHandler = catchAsync(async (req, res) => {
  const selectedField = parseField(
    Object.keys(req.body).join(',') as string | undefined,
    req.query.ignoreFields as string | undefined
  );

  const Team = await teamService.updateTeam(req.params.id, req.body, selectedField);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team updated successfully',
    data: Team,
  });
});

export const deleteTeamHandler = catchAsync(async (req, res) => {
  await teamService.deleteTeam(req.params.id);
  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Team deleted successfully',
  });
});