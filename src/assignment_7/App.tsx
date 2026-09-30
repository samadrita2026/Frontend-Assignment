import { useState } from "react";
import "../App.css";

type Task = {
  id: number;
  title: string;
  status: string;
};

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("user") || ""
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const login = (username: string, password: string, remember: boolean) => {
    if (!username || !password) {
      alert("Username and Password are required");
      return;
    }

    // JWT Token Simulation
    const fakeToken = "JWT_" + Date.now();

    setUser(username);
    setToken(fakeToken);

    if (remember) {
      localStorage.setItem("user", username);
      localStorage.setItem("token", fakeToken);
    }
  };

  const logout = () => {
    setUser("");
    setToken("");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (!user || !token) {
    return <Login login={login} />;
  }

  return (
    <Dashboard
      username={user}
      logout={logout}
    />
  );
}

/* LOGIN */

function Login({
  login,
}: {
  login: (
    username: string,
    password: string,
    remember: boolean
  ) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const strength =
    password.length === 0
      ? ""
      : password.length < 5
      ? "Weak"
      : password.length < 8
      ? "Medium"
      : "Strong";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      alert("Username is required");
      return;
    }

    if (!password) {
      alert("Password is required");
      return;
    }

    login(username, password, remember);
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={submit}>
        <h1>Login</h1>
        <p>Task Manager Authentication</p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password && (
          <p className={`strength ${strength.toLowerCase()}`}>
            Password Strength: {strength}
          </p>
        )}

        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember Me
        </label>

        <button className="primary-btn">
          Login
        </button>
      </form>
    </div>
  );
}

/* DASHBOARD */

function Dashboard({
  username,
  logout,
}: {
  username: string;
  logout: () => void;
}) {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React Assignment",
      status: "Pending",
    },
    {
      id: 2,
      title: "Prepare Presentation",
      status: "Raised",
    },
  ]);

  return (
    <div>
      <header className="task-header">
        <div className="task-header-inner">
          <h2 className="task-logo">
            Task<span>Manager</span>
          </h2>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="page-container">
        <div className="welcome">
          <p className="page-label">Protected Dashboard</p>

          <h1>Welcome, {username}!</h1>

          <p>
            You have successfully logged in using the simulated JWT
            authentication system.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>
              {tasks.filter(t => t.status === "Pending").length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Raised</span>
            <strong>
              {tasks.filter(t => t.status === "Raised").length}
            </strong>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>My Tasks</h2>

          {tasks.map(task => (
            <div className="task-card" key={task.id}>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;