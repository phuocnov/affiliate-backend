import express from "express";
import {
  getUserRoles,
  createUserRole,
  deleteUserRole,
} from "../../service/userRole";

const userRole = express.Router();

userRole.get("/", async (req, res) => {
  try {
    const { roleName, username } = req.query;
    const userRoles = await getUserRoles({
      user_id: username as string,
      role_id: roleName as string,
    });
    res.status(200).json(userRoles);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

userRole.post("/", async (req, res) => {
  try {
    const { username, roleName } = req.body;
    const newUserRole = await createUserRole({
      user_id: username,
      role_id: roleName,
    });
    res.status(201).json(newUserRole);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

userRole.delete("/", async (req, res) => {
  try {
    const { username, roleName } = req.body;
    await deleteUserRole({
      user_id: username,
      role_id: roleName,
    });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default userRole;
