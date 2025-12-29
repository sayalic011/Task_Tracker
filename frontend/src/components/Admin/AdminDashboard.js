import { useEffect, useState } from "react";
// import API from "../services/api";
import API from '../../services/api';

import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

export default function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await API.get("/admin/data"); // endpoint from admin.controller
      setUsers(res.data.users);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter based on search
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <div>
      <AdminNavbar logout={logout} search={search} setSearch={setSearch} />

      <div className="admin-container">
        <div className="admin-section">
          <h3>Users</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-section">
          <h3>Tasks</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
