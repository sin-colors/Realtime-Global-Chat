import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import connectToMongoDB from "./db/connectToMongoDB";
import messageRoutes from "./routes/message.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// リクエストのbodyからJSONを取り出すために必要なミドルウェア
app.use(express.json());
//
app.use(cookieParser());

// ミドルウェアの追加
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello world!");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
