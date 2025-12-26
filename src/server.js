import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { pool } from "./config/db.js";
import { swaggerDocs } from "./swagger.js";

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(bodyParser.json());

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.send("✅ Daily Task Checklist API is running");
});

/* -------------------- SWAGGER -------------------- */
swaggerDocs(app);

/* -------------------- SERVER START -------------------- */
const PORT = 5000;

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📄 Swagger Docs on http://localhost:${PORT}/api-docs`);
  } catch (err) {
    console.error("❌ Database connection failed", err);
  }
});
