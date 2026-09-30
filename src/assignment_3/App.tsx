import { useState } from "react";
import "../App.css";

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  department: string;
  gender: string;
  phone: string;
  localAddress: string;
  permanentAddress: string;
}

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">Employee Directory</div>

        <nav className="navbar">
          <a href="#employees">Employees</a>
          <a href="#add">Add Employee</a>
        </nav>
      </div>
    </header>
  );
}

function EmployeeForm({
  employee,
  setEmployee,
  onSave,
  onCancel,
  editing,
}: {
  employee: Employee;
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>;
  onSave: () => void;
  onCancel: () => void;
  editing: boolean;
}) {
  return (
    <div className="card" id="add">
      <h2>{editing ? "Edit Employee" : "Add Employee"}</h2>

      <div className="employee-form">
        <input
          type="text"
          placeholder="Employee Name"
          value={employee.name}
          onChange={(e) =>
            setEmployee({ ...employee, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Employee ID"
          value={employee.employeeId}
          onChange={(e) =>
            setEmployee({
              ...employee,
              employeeId: e.target.value,
            })
          }
        />

        <select
          value={employee.department}
          onChange={(e) =>
            setEmployee({
              ...employee,
              department: e.target.value,
            })
          }
        >
          <option value="">Select Department</option>
          <option value="Farming">Farming</option>
          <option value="Management">Management</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <select
          value={employee.gender}
          onChange={(e) =>
            setEmployee({
              ...employee,
              gender: e.target.value,
            })
          }
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="tel"
          placeholder="Phone Number"
          value={employee.phone}
          onChange={(e) =>
            setEmployee({
              ...employee,
              phone: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Local Address"
          value={employee.localAddress}
          onChange={(e) =>
            setEmployee({
              ...employee,
              localAddress: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Permanent Address"
          value={employee.permanentAddress}
          onChange={(e) =>
            setEmployee({
              ...employee,
              permanentAddress: e.target.value,
            })
          }
        />
      </div>

      <div className="employee-actions">
        <button className="btn" onClick={onSave}>
          {editing ? "Update Employee" : "Add Employee"}
        </button>

        {editing && (
          <button className="btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function EmployeeCard({
  employee,
  onEdit,
  onDelete,
}: {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div>
          <h3>{employee.name}</h3>
          <p>Employee ID: {employee.employeeId}</p>
        </div>

        <span className="department">
          {employee.department}
        </span>
      </div>

      <div className="employee-details">
        <p>
          <strong>Gender:</strong> {employee.gender}
        </p>

        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>

        <p>
          <strong>Local Address:</strong>{" "}
          {employee.localAddress}
        </p>

        <p>
          <strong>Permanent Address:</strong>{" "}
          {employee.permanentAddress}
        </p>
      </div>

      <div className="employee-actions">
        <button
          className="btn"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>

        <button
          className="btn delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Rahul Das",
      employeeId: "EMP001",
      department: "Farming",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Kolkata",
    },
    {
      id: 2,
      name: "Priya Sen",
      employeeId: "EMP002",
      department: "Management",
      gender: "Female",
      phone: "9876501234",
      localAddress: "Howrah",
      permanentAddress: "Durgapur",
    },
    {
      id: 3,
      name: "Arjun Roy",
      employeeId: "EMP003",
      department: "Sales",
      gender: "Male",
      phone: "9123456789",
      localAddress: "Siliguri",
      permanentAddress: "Malda",
    },
  ]);

  const emptyEmployee: Employee = {
    id: 0,
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  };

  const [employee, setEmployee] =
    useState<Employee>(emptyEmployee);

  const [editing, setEditing] = useState(false);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  // Add or Update Employee
  const handleSave = () => {
    if (
      !employee.name ||
      !employee.employeeId ||
      !employee.department ||
      !employee.gender ||
      !employee.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editing) {
      setEmployees(
        employees.map((item) =>
          item.id === employee.id ? employee : item
        )
      );

      setEditing(false);
    } else {
      const newEmployee = {
        ...employee,
        id: Date.now(),
      };

      setEmployees([...employees, newEmployee]);
    }

    setEmployee(emptyEmployee);
  };

  // Edit Employee
  const handleEdit = (selectedEmployee: Employee) => {
    setEmployee(selectedEmployee);
    setEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Employee
  const handleDelete = (id: number) => {
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );
  };

  // Search and Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const searchText =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.department
        .toLowerCase()
        .includes(search.toLowerCase());

    const departmentMatch =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return searchText && departmentMatch;
  });

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>
              Employee <span>Directory</span>
            </h1>

            <p>
              Manage farm employees, their departments,
              contact details and addresses in one place.
            </p>
          </div>
        </section>

        <section className="section" id="employees">
          <div className="container">

            <EmployeeForm
              employee={employee}
              setEmployee={setEmployee}
              onSave={handleSave}
              onCancel={() => {
                setEmployee(emptyEmployee);
                setEditing(false);
              }}
              editing={editing}
            />

            <div className="directory-header">
              <div>
                <h2>Employee Directory</h2>

                <p>
                  Total Employees:{" "}
                  <strong>{employees.length}</strong>
                </p>
              </div>

              <div className="filters">
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

                <select
                  value={departmentFilter}
                  onChange={(e) =>
                    setDepartmentFilter(e.target.value)
                  }
                >
                  <option value="All">
                    All Departments
                  </option>
                  <option value="Farming">Farming</option>
                  <option value="Management">
                    Management
                  </option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Maintenance">
                    Maintenance
                  </option>
                </select>
              </div>
            </div>

            <div className="employee-grid">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <div className="card no-results">
                  <h3>No employees found</h3>
                  <p>
                    Try changing the search or department
                    filter.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Employee Directory</p>
      </footer>
    </>
  );
}

export default App;