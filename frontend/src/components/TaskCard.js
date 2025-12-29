import { useState } from "react";
import API from "../services/api";

export default function TaskCard({ task, refresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const saveEdit = async () => {
    try {
      await API.put(`/tasks/${task.id}`, {
        title,
        description,
      });
      setEditing(false);
      refresh();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm("Are you sure to delete this task?")) return;

    try {
      await API.delete(`/tasks/${task.id}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // 🔹 Format updated_at date
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (editing) {
    return (
      <div className="task-card">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={saveEdit}>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="task-card">
      <strong>{task.title}</strong>
      <p>{task.description}</p>

      {/* ✅ Last Updated Date */}
      {task.updated_at && (
        <p style={{ fontSize: "12px", color: "#666" }}>
          🕒 Updated on {formatDate(task.updated_at)}
        </p>
      )}

      <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}
