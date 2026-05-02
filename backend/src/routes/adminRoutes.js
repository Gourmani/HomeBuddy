import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { deleteUser, deleteMaid } from "../controllers/adminController.js";

import {
  getStats,
  getUsers,
  getMaids,
  getAnalytics,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, isAdmin, getStats);
router.get("/users", protect, isAdmin, getUsers);
router.get("/maids", protect, isAdmin, getMaids);
router.get("/analytics", protect, isAdmin, getAnalytics);
router.delete("/user/:id", protect, isAdmin, deleteUser);
router.delete("/maid/:id", protect, isAdmin, deleteMaid);

export default router;