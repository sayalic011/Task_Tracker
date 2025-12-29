import { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskBoard from "./components/TaskBoard";
import Summary from "./components/Summary";
import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import Signup from "./components/Signup";
import AdminDashboard from "./components/Admin/AdminDashboard";
import API from "./services/api";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false); // ✅ FIX 1
  const [showSignup, setShowSignup] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  /* ---------------- LOAD TASKS ---------------- */
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  useEffect(() => {
    if (loggedIn && !isAdmin) {
      loadTasks();
    }
  }, [loggedIn, isAdmin]);

  /* ---------------- DRAG & DROP ---------------- */
  const onDrag = async (result) => {
    if (!result.destination) return;

    try {
      await API.put(`/tasks/${result.draggableId}`, {
        status: result.destination.droppableId,
      });
      loadTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignupSuccess = () => {
    setSignupMessage("Account created successfully! Please log in.");
    setShowSignup(false);
  };

  /* ---------------- NOT LOGGED IN ---------------- */
  if (!loggedIn) {
    if (showSignup) {
      return (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setShowSignup(false)}
        />
      );
    }

    return (
      <>
        {signupMessage && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              textAlign: "center",
            }}
          >
            {signupMessage}
          </div>
        )}

        <Login
          onLogin={(data) => {
            // ✅ FIX 2: Detect ADMIN
            if (data?.role === "ADMIN") {
              setIsAdmin(true);
            } else {
              localStorage.setItem("user", JSON.stringify(data));
              setUser(data);
            }
            setLoggedIn(true);
          }}
          onSwitchToSignup={() => setShowSignup(true)}
        />
      </>
    );
  }

  /* ---------------- ADMIN VIEW ---------------- */
  if (isAdmin) {
    return <AdminDashboard onLogout={logout} />;
  }

  /* ---------------- USER VIEW ---------------- */
  return (
    <div>
      <Navbar user={user} search={search} setSearch={setSearch} logout={logout} />

      <Summary tasks={tasks} />
      <AddTask refresh={loadTasks} />

      <TaskBoard
        tasks={tasks.filter((t) =>
          (t.title || "").toLowerCase().includes(search.toLowerCase())
        )}
        onDrag={onDrag}
      />
    </div>
  );
}
