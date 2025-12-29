import { useState } from "react";
import API from "../services/api";
import "./AddTask.css";

export default function AddTask({ refresh }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

  const addTask = async () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    try {
      await API.post("/tasks", { title, description, status });
      setTitle("");
      setDescription("");
      setStatus("TODO");
      setOpen(false);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  return (
    <>
      {/* Plus Button */}
      <button className="add-btn" onClick={() => setOpen(true)}>
        ➕ Add Task
      </button>

      {/* Modal */}
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Task</h3>

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="TODO">TODO</option>
              <option value="DONE">DONE</option>
            </select>

            <div className="modal-actions">
              <button onClick={addTask}>Add</button>
              <button className="cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
