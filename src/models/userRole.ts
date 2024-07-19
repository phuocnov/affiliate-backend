import mongoose, { Document, Model } from "mongoose";

export interface IUserRole extends Document {
  user_id: string;
  role_id: string;
}

const userRoleSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role_id: {
    type: String,
    required: true,
  },
});

const UserRole: Model<IUserRole> = mongoose.model<IUserRole>(
  "UserRole",
  userRoleSchema
);

export default UserRole;
