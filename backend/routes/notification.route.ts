import express from "express";
import protectRoute from "../middleware/protectRoute";
import { saveSubscription } from "../controllers/notification.controller";

const router = express.Router();
router.post("/subscribe", protectRoute, saveSubscription);

export default router;
