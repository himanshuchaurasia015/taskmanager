import express from "express";
import {
  userSignin,
  userSignup,
  getUserDetail,
  updateUser,
  getUsers,
  userSignOut,
} from "../controllers/userControllers.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { verifyToken } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.get("/", isAdmin, getUsers);
router.post("/signup", userSignup);
router.post("/login", userSignin);
router.post("/logout", verifyToken, userSignOut);

router
  .route("/:userId")
  .get(verifyToken, getUserDetail)
  .put(verifyToken, updateUser);

export default router;
