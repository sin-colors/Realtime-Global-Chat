import express from "express";
import {
  getMessages,
  markAsRead,
  sendMessage,
} from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();
router.get("/", protectRoute, getMessages);
router.post("/send", protectRoute, sendMessage); // router.post("/", protectRoute, sendMessage)で良いかも。。。
router.post("/read", protectRoute, markAsRead);

export default router;
