import express from "express";
import auth from "./auth";
import user from "./user";
import product from "./product";
import brand from "./brand";
const admin = express.Router();

admin.use("/auth", auth);
admin.use("/user", user);
admin.use("/product", product);
admin.use("/brand", brand);

export default admin;
