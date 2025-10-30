import express from "express";
import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  bookSession,
  cancelBooking,
} from "../controllers/sessionControllers.js";

import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.use(requireAuth);

// ROUTES FOR ALL AUTHENTICATED USERS
router.get("/", getAllSessions);
router.get("/:id", getSessionById);

// STUDENT-SPECIFIC ROUTES 
router.patch("/:id/book", bookSession);
router.patch("/:id/cancel", cancelBooking);

//  ADMIN-ONLY ROUTES
router.post("/", requireAdmin, createSession);

router.patch("/:id", requireAdmin, updateSession);

router.delete("/:id", requireAdmin, deleteSession);

export default router;