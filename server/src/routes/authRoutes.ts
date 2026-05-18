console.log("🔥 authRoutes file loaded");

import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator";

import { validate } from "../middleware/validationMiddleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: (req as any).user,
  });
});

export default router;