import express from "express";
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "../../service/permission";

const permission = express.Router();

permission.get("/", async (req, res) => {
  try {
    const { code } = req.query;
    const permissions = await getPermissions({ code: code as string });
    res.status(200).json(permissions);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

permission.post("/", async (req, res) => {
  try {
    const { code, desc } = req.body;
    const newPermission = await createPermission({ code, desc });
    res.status(201).json(newPermission);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

permission.put("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const { desc } = req.body;
    const updatedPermission = await updatePermission({ code, desc });
    res.status(200).json(updatedPermission);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

permission.delete("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    await deletePermission({ code });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default permission;
