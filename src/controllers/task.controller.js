import { pool } from '../config/db.js';

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  await pool.query(
    "INSERT INTO tasks(user_id,title,description,status) VALUES($1,$2,$3,$4)",
    [req.user.id, title, description, status]
  );
  res.json({ message: "Task added" });
};

export const getTasks = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id=$1",
    [req.user.id]
  );
  res.json(result.rows);
};

export const updateTask = async (req, res) => {
  const { status } = req.body;
  await pool.query(
    "UPDATE tasks SET status=$1 WHERE id=$2",
    [status, req.params.id]
  );
  res.json({ message: "Updated" });
};
