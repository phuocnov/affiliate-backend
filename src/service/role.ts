import Role, { IRole } from "../models/role";

export const createRole = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<IRole> => {
  const existedRole = await Role.findOne({
    code: code,
  });

  if (existedRole) {
    throw new Error("Role already exists");
  }

  const role = await Role.create({
    code,
    desc,
  });
  await role.save();
  return role;
};

export const getRoles = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}): Promise<IRole[]> => {
  return Role.find({
    code: code,
    desc: { $regex: desc, $options: "i" },
  });
};

export const updateRole = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<IRole> => {
  const role = await Role.findOne({ code: code });
  if (!role) {
    throw new Error("Role not found");
  }
  role.desc = desc;
  await role.save();
  return role;
};

export const deleteRole = async ({ code }: { code: string }): Promise<void> => {
  const role = await Role.findOne({ code: code });
  if (!role) {
    throw new Error("Role not found");
  }
  await Role.deleteOne({ _id: role._id });
};
