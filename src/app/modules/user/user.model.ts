import { Document, Schema, model } from 'mongoose';
import { hashPassword } from '@/utils/hash';
import { USER_ROLES } from './user.constant';
import { IUser } from './user.schema';

const userSchema = new Schema<IUser & Document>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    twoFactor: {
      code: { type: String, default: null },
      expiresAt: { type: Date, default: null },
      isEnabled: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

const UserModel = model<IUser & Document>('User', userSchema);

export default UserModel;
