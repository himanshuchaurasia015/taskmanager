import express from "express";
import { createProgress, getTaskProgress, getUserTaskProgress } from "../controllers/progressControllers.js";
const router = express.Router();

router.post("/", createProgress);
router.get("/task/:taskId", getTaskProgress);
router.get("/user/:userId", getUserTaskProgress);

export default router;
