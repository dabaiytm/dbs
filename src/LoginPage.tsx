import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Use React Router to navigate to the main page
      navigate("/main"); // Change this to use navigate
    } catch (err) {
      setLoading(false);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="title">Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          {error && <p className="error">{error}</p>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </header>
    </div>
  );
};

export default LoginPage;
