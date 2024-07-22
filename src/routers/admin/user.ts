import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
} from "../../service/user";

const user = express.Router();

user.post("/", (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = createUser({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

user.get("/", (req, res) => {
  try {
    const { username } = req.query;
    const users = getAllUsers({ username: username as string });
    res.status(200).json(users);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

user.put("/", (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedUser = updateUser({ username, password });
    res.status(200).json(updatedUser);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

user.delete("/", (req, res) => {
  try {
    const { username } = req.body;
    deleteUser({ username });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default user;
