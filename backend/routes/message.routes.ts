import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();
router.get("/", protectRoute, getMessages);
router.post("/send", protectRoute, sendMessage);

export default router;
