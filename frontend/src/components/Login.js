import { useState } from "react";
import API from "../services/api";
import "./Login.css";

export default function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "ADMIN") {
        onLogin({ role: "ADMIN" });
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onLogin(res.data.user);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <>
      {/* 🔵 BLUE NAVBAR */}
      <nav className="login-navbar">
        <h1>📝 Task Tracker</h1>
      </nav>

      {/* LOGIN CARD */}
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to your account</p>

          <div className="login-form">
            {error && <div className="login-error">{error}</div>}

            <div className="login-form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="login-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <button className="login-button" onClick={submit} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="login-divider">OR</div>

            <button className="signup-button" onClick={onSwitchToSignup}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
