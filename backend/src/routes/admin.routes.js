import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { viewAllData } from "../controllers/admin.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/data:
 *   get:
 *     summary: View all users and tasks (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all users and tasks
 *       403:
 *         description: Access denied
 */
router.get(
  "/data",
  authenticate,
  authorize("ADMIN"),
  viewAllData
);

export default router;
