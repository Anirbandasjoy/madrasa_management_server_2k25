import { Document, Schema, model } from 'mongoose';
import { TeamInput } from './team.schema';

export interface ITeam extends Document, TeamInput {}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamModel = model<ITeam>('Team', teamSchema);

export default TeamModel;
