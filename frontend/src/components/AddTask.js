import { useState } from "react";
import API from "../services/api";

export default function AddTask({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO"); // default status

  const addTask = async () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description,
        status,
      });

      // reset fields
      setTitle("");
      setDescription("");
      setStatus("TODO");

      // reload tasks in parent
      refresh();
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task. Check console.");
    }
  };

  return (
    <div style={{ padding: "10px", marginBottom: "20px" }}>
      <h3>Add New Task</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", margin: "8px 0", width: "100%" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", margin: "8px 0", width: "100%", height: "60px" }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ display: "block", margin: "8px 0" }}
      >
        <option value="TODO">TODO</option>
        <option value="DONE">DONE</option>
      </select>
      <button onClick={addTask} style={{ padding: "6px 12px" }}>
        Add Task
      </button>
    </div>
  );
}
