import Permission, { IPermission } from "../models/permission";

export const createPermission = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<IPermission> => {
  const existedPermission = await Permission.findOne({
    code: code,
  });

  if (existedPermission) {
    throw new Error("Permission already exists");
  }

  const permission = await Permission.create({
    code,
    desc,
  });
  await permission.save();
  return permission;
};

export const getPermissions = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}): Promise<IPermission[]> => {
  return Permission.find({
    code: code,
    desc: { $regex: desc, $options: "i" },
  });
};

export const updatePermission = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<IPermission> => {
  const permission = await Permission.findOne({ code: code });
  if (!permission) {
    throw new Error("Permission not found");
  }
  permission.desc = desc;
  await permission.save();
  return permission;
};

export const deletePermission = async ({
  code,
}: {
  code: string;
}): Promise<void> => {
  const permission = await Permission.findOne({ code: code });
  if (!permission) {
    throw new Error("Permission not found");
  }
  await Permission.deleteOne({ _id: permission._id });
};
