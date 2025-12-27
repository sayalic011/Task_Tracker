import "./Navbar.css";

export default function Navbar({ user, search, setSearch, logout }) {
  return (
    <div className="navbar">
      <h2>📝 Task Tracker</h2>

      <div className="search-box">
        🔍
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="profile">
        👤 {user?.name}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
