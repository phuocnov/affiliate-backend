import UserRole, { IUserRole } from "../models/userRole";

export const createUserRole = async ({
  user_id,
  role_id,
}: {
  user_id: string;
  role_id: string;
}): Promise<IUserRole> => {
  const existedUserRole = await UserRole.findOne({
    user_id: user_id,
    role_id: role_id,
  });

  if (existedUserRole) {
    throw new Error("UserRole already exists");
  }

  const userRole = await UserRole.create({
    user_id,
    role_id,
  });
  await userRole.save();
  return userRole;
};

export const getUserRoles = async ({
  user_id,
  role_id,
}: {
  user_id?: string;
  role_id?: string;
}): Promise<IUserRole[]> => {
  const query: any = {};
  if (user_id) {
    query.user_id = user_id;
  }
  if (role_id) {
    query.role_id = role_id;
  }

  return UserRole.find(query);
};

export const deleteUserRole = async ({
  user_id,
  role_id,
}: {
  user_id: string;
  role_id: string;
}): Promise<void> => {
  const userRole = await UserRole.findOne({
    user_id: user_id,
    role_id: role_id,
  });
  if (!userRole) {
    throw new Error("UserRole not found");
  }
  await userRole.deleteOne({ _id: userRole._id });
};
