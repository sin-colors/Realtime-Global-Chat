import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import userRoutes from "./routes/user.route";
import connectToMongoDB from "./db/connectToMongoDB";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket";

dotenv.config();
const PORT = process.env.PORT || 5000;

// リクエストのbodyからJSONを取り出すために必要なミドルウェア
// app.use(express.json());
app.use(express.json({ limit: "20mb" }));
// リクエストボディからクッキーを取り出すのに必要なミドルウェア
app.use(cookieParser());

// ミドルウェアの追加（ルート関係）
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
