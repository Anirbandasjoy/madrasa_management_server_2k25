import { TeamInput } from './team.schema';
import ITeam from './team.model';

const createTeam = async (payload: TeamInput) => {
  if (!payload) {
    throw new Error('All team data are not provided');
  }
  console.log(payload);
  const created = await ITeam.create(payload);
  if (!created) {
    throw new Error('Team creation failed');
  }
};

export const teamService = {
  createTeam,
};
