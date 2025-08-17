import { ITeam } from './team.schema';
import TeamModel from './team.model';
import { BadRequestError, ConflictError } from '@/app/errors/apiError';


const createTeam = async (payload: ITeam) => {
  if (!payload) {
    throw new Error('Payload is required to create a team');
  }

  const existingTeam = await TeamModel.findOne({ name: payload.name });
  if (existingTeam) {
    throw ConflictError(`Team with this name already exists: ${payload.name}`);
  }
  const created = await TeamModel.create(payload);
  return created;
};

const getTeam = async (id:string,selectedField?:string|null) => {
  if (!id) {
    throw BadRequestError('Team ID is required to fetch a team');
  }
  const team = selectedField ? await TeamModel.findById(id).select(selectedField) : await TeamModel.findById(id);
  if (!team) {
    throw BadRequestError(`Team with ID ${id} not found`);
  }
  return team;
};



const updateTeam = async (
  id: string,
  payload: Partial<ITeam>,
  selectedField?: string | null
) => {

  const event = selectedField
    ? await TeamModel.findByIdAndUpdate(id, payload, { new: true }).select(selectedField)
    : await TeamModel.findByIdAndUpdate(id, payload, { new: true });
  return event;
};

const deleteTeam = async (id: string) => {
  await TeamModel.findByIdAndDelete(id);
};

export const teamService = {
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
};
