import mongoose, { Document, Model } from "mongoose";

export interface IPermission extends Document {
  code: string;
  desc: string;
}

const permissionSchema = new mongoose.Schema({
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

const Permission: Model<IPermission> = mongoose.model<IPermission>(
  "Permission",
  permissionSchema
);

export default Permission;
