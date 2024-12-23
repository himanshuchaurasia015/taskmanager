import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createProject,
  deleteProject,
  getProjectDetails,
  getProjects,
  updateProjectDetails,
  // assignedProjects,
  // acceptProject,
} from "../controllers/projectControllers.js";
const router = express.Router();

router.route("/").get(getProjects).post(isAdmin, createProject);
router
  .route("/:projectId")
  .get(getProjectDetails)
  .put(isAdmin, updateProjectDetails)
  .delete(isAdmin, deleteProject);
// router.get("/:userId", assignedProjects);
// router.get("/:projectId/accept", acceptProject);

export default router;
