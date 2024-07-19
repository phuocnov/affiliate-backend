import express from "express";
import user from "./user";
import admin from "./admin";
const api = express.Router();

api.use("/user", user);
api.use("/admin", admin);

export default api;
