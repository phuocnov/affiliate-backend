import User, { IUser } from "../models/user";
import bcrypt from "bcryptjs";

export const createUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<IUser> => {
  const existedUser = await User.findOne({
    username: username,
  });
  if (existedUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    hashedPassword,
  });
  await user.save();
  return user;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return User.find();
};

export const findUserByName = async ({
  username,
}: {
  username?: string;
}): Promise<IUser[]> => {
  return User.find({
    username: { $regex: username, $options: "i" },
  });
};

export const updateUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<IUser> => {
  const user = await User.findOne({
    username: username,
  });
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  return user;
};

export const deleteUser = async ({
  username,
}: {
  username: string;
}): Promise<void> => {
  const user = await User.findOne({
    username: username,
  });
  if (!user) {
    throw new Error("User not found");
  }
  await user.deleteOne({ _id: user._id });
};
