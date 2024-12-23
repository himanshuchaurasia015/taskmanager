import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createScore,
  getProjectScore,
  getUserScore,
} from "../controllers/scoreController.js";
const router = express.Router();

router.post("/", isAdmin, createScore);
router.get("/user/:userId", getUserScore);
router.get("/project/:projectId", isAdmin, getProjectScore);

export default router;
