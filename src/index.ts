import express, { Express } from "express";
import connectDB from "./database/db";
import swaggerDocs from "./util/swagger";
import api from "./routers";

const app: Express = express();

const PORT = 3000;

app.use(express.json());
app.use("/api", api);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
  swaggerDocs(app, PORT);
});
