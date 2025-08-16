import { Document, Schema, model } from 'mongoose';
import { ITeam } from './team.schema';

const teamSchema = new Schema<ITeam & Document>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamModel = model<ITeam & Document>('Team', teamSchema);
export default TeamModel;
