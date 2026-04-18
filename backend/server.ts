import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";
import connectToMongoDB from "./db/connectToMongoDB";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// リクエストのbodyからJSONを取り出すために必要なミドルウェア
app.use(express.json());
// リクエストボディからクッキーを取り出すのに必要なミドルウェア
app.use(cookieParser());

// ミドルウェアの追加（ルート関係）
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello world!");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
