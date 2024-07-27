import express from "express";

import {
  getRolePermissions,
  createRolePermission,
  deleteRolePermission,
  updateRolePermission,
} from "../../service/rolePermission";

const rolePermission = express.Router();

rolePermission.get("/", async (req, res) => {
  try {
    const { roleName, permissionCode } = req.query;
    const rolePermissions = await getRolePermissions({
      role_id: roleName as string,
      permission_id: permissionCode as string,
    });
    res.status(200).json(rolePermissions);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

rolePermission.post("/", async (req, res) => {
  try {
    const { roleName, permissionCode } = req.body;
    const newRolePermission = await createRolePermission({
      role_id: roleName,
      permission_id: permissionCode,
    });
    res.status(201).json(newRolePermission);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

rolePermission.put("/", async (req, res) => {
  try {
    const { roleName, permissionCode } = req.body;
    const updatedRolePermission = await updateRolePermission({
      role_id: roleName,
      permission_id: permissionCode,
    });
    res.status(200).json(updatedRolePermission);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

rolePermission.delete("/", async (req, res) => {
  try {
    const { roleName, permissionCode } = req.body;
    await deleteRolePermission({
      role_id: roleName,
      permission_id: permissionCode,
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

export default rolePermission;
