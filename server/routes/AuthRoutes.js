import express from "express";
import {
  authMiddleware,
  deleteProfile,
  isAuthenticated,
  login,
  logout,
  register,
} from "../controllers/AdminUserController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteProfile);
router.get("/check-auth", authMiddleware, isAuthenticated);

export default router;
