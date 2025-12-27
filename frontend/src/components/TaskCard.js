import { useState } from "react";
import API from "../services/api";

export default function TaskCard({ task, refresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const saveEdit = async () => {
    try {
      await API.put(`/tasks/${task.id}`, { title, description });
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
      <div style={{ marginTop: "5px", display: "flex", gap: "5px" }}>
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}
