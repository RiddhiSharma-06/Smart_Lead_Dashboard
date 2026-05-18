import express from "express";

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/lead1Controller";

import { verifyToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

// GET ALL LEADS
router.get(
  "/",
  (req, res, next) => {
    console.log("GET /LEADS HIT");
    next();
  },
  verifyToken,
  getLeads
);

// CREATE LEAD
router.post("/", verifyToken, createLead);

// UPDATE LEAD
router.put("/:id", verifyToken, updateLead);

// DELETE LEAD ADMIN ONLY
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteLead
);

export default router;