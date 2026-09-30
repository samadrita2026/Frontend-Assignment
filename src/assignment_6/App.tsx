import { useState } from "react";
import "../App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  category: string;
  raised: string;
  due: string;
  status: string;
};

function App() {
  const [page, setPage] = useState("dashboard");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React Assignment",
      description: "Finish Task Manager application.",
      priority: "High",
      category: "Academic",
      raised: new Date().toLocaleString(),
      due: "28 Aug 2026",
      status: "Pending",
    },
  ]);

  const [selected, setSelected] = useState<Task | null>(null);

  const navigate = (p: string, task?: Task) => {
    setPage(p);
    setSelected(task || null);
    window.history.pushState({}, "", p === "details" ? `?id=${task?.id}` : `/${p}`);
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    navigate("tasks");
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: "Closed" } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <header className="task-header">
        <div className="task-header-inner">
          <h2 className="task-logo">
            Task<span>Manager</span>
          </h2>

          <nav className="task-nav">
            <button onClick={() => navigate("dashboard")}>Dashboard</button>
            <button onClick={() => navigate("tasks")}>Tasks</button>
            <button onClick={() => navigate("add")}>Add Task</button>
            <button onClick={() => navigate("completed")}>
              Completed
            </button>
          </nav>
        </div>
      </header>

      {page === "dashboard" && (
        <Dashboard tasks={tasks} navigate={navigate} />
      )}

      {page === "tasks" && (
        <Tasks
          tasks={tasks}
          navigate={navigate}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      )}

      {page === "add" && <AddTask addTask={addTask} />}

      {page === "details" && selected && (
        <Details task={selected} navigate={navigate} />
      )}

      {page === "completed" && (
        <Completed tasks={tasks} navigate={navigate} />
      )}
    </div>
  );
}

/* Dashboard */

function Dashboard({
  tasks,
  navigate,
}: {
  tasks: Task[];
  navigate: (p: string, task?: Task) => void;
}) {
  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="page-label">Overview</p>
          <h1>Dashboard</h1>
          <p>Manage your tasks easily.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("add")}
        >
          + Add Task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="stat-card">
          <span>Raised</span>
          <strong>
            {tasks.filter(t => t.status === "Raised").length}
          </strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>
            {tasks.filter(t => t.status === "Pending").length}
          </strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>
            {tasks.filter(t => t.status === "Closed").length}
          </strong>
        </div>
      </div>
    </main>
  );
}

/* Tasks */

function Tasks({
  tasks,
  navigate,
  completeTask,
  deleteTask,
}: {
  tasks: Task[];
  navigate: (p: string, task?: Task) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  const [filter, setFilter] = useState("All");

  const filtered = tasks.filter(
    t => filter === "All" || t.status === filter
  );

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="page-label">Management</p>
          <h1>Tasks</h1>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("add")}
        >
          + Add Task
        </button>
      </div>

      <div className="filter-box">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Raised</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="task-list">
        {filtered.map(task => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <small>
              {task.priority} | {task.category} | {task.status}
            </small>

            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => navigate("details", task)}
              >
                Details
              </button>

              {task.status !== "Closed" && (
                <button
                  className="complete-btn"
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/* Add Task */

function AddTask({
  addTask,
}: {
  addTask: (task: Task) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Academic");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) return;

    addTask({
      id: Date.now(),
      title,
      description,
      priority,
      category,
      raised: new Date().toLocaleString(),
      due: "28 Aug 2026",
      status: "Raised",
    });
  };

  return (
    <main className="page-container">
      <h1>Add Task</h1>

      <form className="task-form" onSubmit={submit}>
        <input
          placeholder="Task Header"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Academic</option>
          <option>Personal</option>
        </select>

        <input value="28 Aug 2026" readOnly />

        <button className="primary-btn">
          Create Task
        </button>
      </form>
    </main>
  );
}

/* Details */

function Details({
  task,
  navigate,
}: {
  task: Task;
  navigate: (p: string, task?: Task) => void;
}) {
  return (
    <main className="page-container">
      <div className="details-card">
        <span className="status closed">{task.status}</span>

        <h1>{task.title}</h1>
        <p>{task.description}</p>

        <div className="details-grid">
          <p><b>Priority:</b> {task.priority}</p>
          <p><b>Category:</b> {task.category}</p>
          <p><b>Raised:</b> {task.raised}</p>
          <p><b>Due:</b> {task.due}</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("tasks")}
        >
          Back to Tasks
        </button>
      </div>
    </main>
  );
}

/* Completed */

function Completed({
  tasks,
}: {
  tasks: Task[];
  navigate: (p: string, task?: Task) => void;
}) {
  return (
    <main className="page-container">
      <h1>Completed Tasks</h1>

      <div className="task-list">
        {tasks
          .filter(t => t.status === "Closed")
          .map(t => (
            <div className="task-card" key={t.id}>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <span className="status closed">Closed</span>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;