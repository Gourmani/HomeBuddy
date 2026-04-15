import express from "express";
import { createRequest ,getRequestsForMaid ,updateRequestStatus , checkRequestStatus , getRequestsForUser} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/", protect, createRequest);
router.get("/maid", protect, getRequestsForMaid);
router.put("/:id", protect, updateRequestStatus);
router.get("/status/:maidId", protect, checkRequestStatus);
router.get("/user", protect, getRequestsForUser);

export default router;