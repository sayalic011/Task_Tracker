// src/routes/task.routes.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Milk, Eggs, Bread
 *               status:
 *                 type: string
 *                 example: TODO
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/", authenticate, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", authenticate, getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task (status, title, description)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Milk, Eggs, Bread
 *               status:
 *                 type: string
 *                 example: DONE
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put("/:id", authenticate, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete("/:id", authenticate, deleteTask);

export default router;
