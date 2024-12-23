import express from "express";
import {
  createTasks,
  deleteTask,
  getTaskDetail,
  getTasks,
  updateTask,
} from "../controllers/taskControllers.js";
import { verifyToken } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/").post(verifyToken, createTasks);
router.route("/:projectId").get(verifyToken, getTasks);
router
  .route("/:taskId")
  .get(verifyToken, getTaskDetail)
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);

export default router;
