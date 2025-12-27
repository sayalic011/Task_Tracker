// import pool from "../db.js";
import { pool } from '../config/db.js';


export const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  await pool.query(
    `INSERT INTO tasks (title, description, status, user_id)
     VALUES ($1,$2,$3,$4)`,
    [title, description || "", status || "TODO", req.user.id]
  );

  res.json({ message: "Task created" });
};

export const getTasks = async (req, res) => {
  const tasks = await pool.query(
    `SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC`,
    [req.user.id]
  );

  res.json(tasks.rows);
};

// export const updateTask = async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;

//   await pool.query(
//     `UPDATE tasks SET status=$1 WHERE id=$2 AND user_id=$3`,
//     [status, id, req.user.id]
//   );

//   res.json({ message: "Task updated" });
// };
// export const deleteTask = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query(
//       "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
//       [id, req.user.id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ error: "Task not found" });

//     res.json({ message: "Task deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const updateTask = async (req, res) => {
  const { status, title, description } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET 
         status = $1,
         title = COALESCE($2, title),
         description = COALESCE($3, description)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [status, title, description, id, req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task updated", task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
