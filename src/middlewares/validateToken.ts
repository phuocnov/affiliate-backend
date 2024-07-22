import { Request, Response, NextFunction } from "express";
import { validateToken as validateTokenService } from "../service/auth";

const validateToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await validateTokenService(token.split(" ")[1]);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default validateToken;
