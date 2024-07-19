import mongoose, { Document, Model } from "mongoose";

export interface IRole extends Document {
  code: string;
  desc: string;
}

const userSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Role: Model<IRole> = mongoose.model<IRole>("Role", userSchema);

export default Role;
