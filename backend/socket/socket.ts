import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
  },
});
// const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected. socket id: ", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("user connected. user id: ", userId);
  // if (userId !== undefined) {
  //   userSocketMap[userId] = socket.id;
  // }
  socket.on("disconnect", () => {
    console.log("user disconnected. socket id: ", socket.id);
  });
});
export { app, server, io };
