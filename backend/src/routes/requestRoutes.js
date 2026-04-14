import express from "express";
import { createRequest ,getRequestsForMaid} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/", protect, createRequest);
router.get("/maid", protect, getRequestsForMaid);


export default router;