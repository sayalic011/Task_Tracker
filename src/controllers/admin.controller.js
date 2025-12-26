import { pool } from '../config/db.js';

export const viewAllData = async (req, res) => {
  const users = await pool.query("SELECT id,name,email FROM users");
  const tasks = await pool.query("SELECT * FROM tasks");
  res.json({ users: users.rows, tasks: tasks.rows });
};
