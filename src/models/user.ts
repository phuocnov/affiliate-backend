import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
