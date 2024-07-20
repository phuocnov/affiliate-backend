import RolePermission, { IRolePermisson } from "../models/rolePermission";

export const createRolePermission = async ({
  role_id,
  permission_id,
}: {
  role_id: string;
  permission_id: string;
}): Promise<IRolePermisson> => {
  const existedRolePermission = await RolePermission.findOne({
    role_id: role_id,
    permission_id: permission_id,
  });

  if (existedRolePermission) {
    throw new Error("RolePermission already exists");
  }

  const rolePermission = await RolePermission.create({
    role_id,
    permission_id,
  });
  await rolePermission.save();
  return rolePermission;
};

export const getRolePermissions = async ({
  role_id,
  permission_id,
}: {
  role_id?: string;
  permission_id?: string;
}): Promise<IRolePermisson[]> => {
  return RolePermission.find({
    role_id: role_id,
    permission_id: permission_id,
  });
};

export const updateRolePermission = async ({
  role_id,
  permission_id,
}: {
  role_id: string;
  permission_id: string;
}): Promise<IRolePermisson> => {
  const rolePermission = await RolePermission.findOne({
    role_id: role_id,
    permission_id: permission_id,
  });
  if (!rolePermission) {
    throw new Error("RolePermission not found");
  }
  await rolePermission.save();
  return rolePermission;
};

export const deleteRolePermission = async ({
  role_id,
  permission_id,
}: {
  role_id: string;
  permission_id: string;
}): Promise<void> => {
  const rolePermission = await RolePermission.findOne({
    role_id: role_id,
    permission_id: permission_id,
  });
  if (!rolePermission) {
    throw new Error("RolePermission not found");
  }
  await RolePermission.deleteOne({ _id: rolePermission._id });
};
