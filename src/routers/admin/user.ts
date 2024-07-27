import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  findUserByName,
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

// Route to handle requests without a username
// user.get("/", async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     let errorMessage = "Something went wrong";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     res.status(400).json({ message: errorMessage });
//   }
// });

user.get("/", async (req, res) => {
  try {
    const { username } = req.query;
    console.log(username);
    const users = await findUserByName({ username: username as string });
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

user.delete("/:username", (req, res) => {
  try {
    const { username } = req.params;
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
