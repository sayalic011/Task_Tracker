import { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskBoard from "./components/TaskBoard";
import Summary from "./components/Summary";
import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import API from "./services/api";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      return null;
    }
  });

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  useEffect(() => {
    if (loggedIn) loadTasks();
  }, [loggedIn]);

  // Drag & drop update
  const onDrag = async (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      loadTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
  };

  if (!loggedIn)
    return (
      <Login
        onLogin={(userData) => {
          // Always store as JSON string
          localStorage.setItem("user", JSON.stringify(userData));
          setLoggedIn(true);
          setUser(userData);
        }}
      />
    );

  return (
    <div>
      <Navbar user={user} search={search} setSearch={setSearch} logout={logout} />
      {/* <AddTask refresh={loadTasks} /> */}

      {/* <AddTask refresh={loadTasks} /> */}

      <Summary tasks={tasks} />
      <AddTask refresh={loadTasks} />

  <TaskBoard
  tasks={(tasks || []).filter((t) =>
    (t.title || "").toLowerCase().includes(search.toLowerCase())
  )}
  onDrag={onDrag}
/>


    </div>
  );
}
