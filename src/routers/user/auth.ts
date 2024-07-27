import express from "express";
import { signin, signup } from "../../service/auth";
import validateToken from "../../middlewares/validateToken";

const auth = express.Router();
auth.get("/health-check", (req, res) => {
  res.status(200).send("Service is healthy");
});

auth.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await signup(username, password);
    res.status(201).json(user);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

auth.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await signin(username, password);
    res.status(200).json(user);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

// auth.post("/validate-token", async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       throw new Error("Token is required");
//     }
//     const user = await validateToken(token);
//     res.status(200).json(user);
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(400).json({ message: error.message });
//   }
// });

auth.get("/current", validateToken, (req: any, res) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
});

export default auth;
