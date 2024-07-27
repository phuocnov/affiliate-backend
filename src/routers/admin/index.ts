import express from "express";
import auth from "./auth";
import user from "./user";
import product from "./product";
import brand from "./brand";
import category from "./category";
import permission from "./permission";
import role from "./role";
import rolePermission from "./rolePermission";
import userRole from "./userRole";
import shop from "./shop";

const admin = express.Router();

admin.use("/auth", auth);
admin.use("/user", user);
admin.use("/product", product);
admin.use("/brand", brand);
admin.use("/brand", brand);
admin.use("/category", category);
admin.use("/permission", permission);
admin.use("/role", role);
admin.use("/role-permission", rolePermission);
admin.use("/user-role", userRole);
admin.use("/shop", shop);

export default admin;
