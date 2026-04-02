import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import connectToMongoDB from "./db/connectToMongoDB";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェアの追加
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
