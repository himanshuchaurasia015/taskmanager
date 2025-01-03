import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentDetail,
  getAssignments,
  updateAssignment,
  getAssignedProjects,
  getUnAssignedUsers,
} from "../controllers/assignmentControllers.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();

router.route("/").get(getAssignments).post(isAdmin, createAssignment);
router.get("/:userId", getAssignedProjects);
router.get("/users/:projectId", getUnAssignedUsers);

router
  .route("/:assignmentId")
  .get(getAssignmentDetail)
  .put(isAdmin, updateAssignment)
  .delete(isAdmin, deleteAssignment);

export default router;
