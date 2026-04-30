import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getMe, getUsersForSidebar } from "../controllers/user.controller";

const router = express.Router();
router.get("/", protectRoute, getUsersForSidebar);
router.get("/me", protectRoute, getMe);

export default router;
