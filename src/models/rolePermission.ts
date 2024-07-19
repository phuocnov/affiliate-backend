import mongoose, { Document, Model } from "mongoose";

export interface IRolePermisson extends Document {
  role_id: string;
  permission_id: string;
}

const rolePermissionSchema = new mongoose.Schema({
  role_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  permission_id: {
    type: String,
    required: true,
  },
});

const RolePermission: Model<IRolePermisson> = mongoose.model<IRolePermisson>(
  "RolePermission",
  rolePermissionSchema
);

export default RolePermission;
