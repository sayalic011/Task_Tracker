import "./AdminNavbar.css";

export default function AdminNavbar({ logout, search, setSearch }) {
  return (
    <div className="admin-navbar">
      <h2>🛠 Admin Dashboard</h2>

      <div className="admin-search-box">
        🔍
        <input
          placeholder="Search users/tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="admin-profile">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
