import { Request, Response, NextFunction } from "express";
import { validateToken as validateTokenService } from "../service/auth";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isValid = await validateTokenService(token);
  if (!isValid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default validateToken;
