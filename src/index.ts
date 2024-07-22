import express, { Express } from "express";
import connectDB from "./database/db";
import swaggerDocs from "./util/swagger";
import api from "./routers";
import cors from "cors";

const app: Express = express();

const PORT = 3001;

app.use(express.json());
app.use(cors()); // Enable CORS
app.use("/api", api);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
  swaggerDocs(app, PORT);
});
