import express from "express";
import auth from "./auth";
const user = express.Router();

user.use("/auth", auth);

export default user;
