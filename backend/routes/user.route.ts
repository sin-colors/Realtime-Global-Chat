import express from "express";
import protectRoute from "../middleware/protectRoute";
import {
  changeUsername,
  getMe,
  getUsersForSidebar,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/", protectRoute, getUsersForSidebar);
router.get("/me", protectRoute, getMe);
router.post("/change-username", protectRoute, changeUsername);

export default router;
