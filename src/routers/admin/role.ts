import express from "express";
import {
  getRoles,
  createRole,
  deleteRole,
  updateRole,
} from "../../service/role";
const role = express.Router();

role.get("/", (req, res) => {
  try {
    const { code } = req.query;
    const roles = getRoles({ code: code as string });
    res.status(200).json(roles);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

role.post("/", (req, res) => {
  try {
    const { code, desc } = req.body;
    const newRole = createRole({ code, desc });
    res.status(201).json(newRole);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

role.put("/:code", (req, res) => {
  try {
    const { code } = req.params;
    const { desc } = req.body;
    const updatedRole = updateRole({ code, desc });
    res.status(200).json(updatedRole);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

role.delete("/:code", (req, res) => {
  try {
    const { code } = req.params;
    deleteRole({ code });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default role;
