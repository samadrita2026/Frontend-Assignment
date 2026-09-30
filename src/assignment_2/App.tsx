import { useState } from "react";
import "../App.css";

type Student = {
  name: string;
  roll: string;
  department: string;
  semester: number;
  cgpa: number;
  photo: string;
};

const students: Student[] = [
  {
    name: "Ananya Sharma",
    roll: "CS101",
    department: "Computer Science",
    semester: 6,
    cgpa: 9.2,
    photo: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Rahul Das",
    roll: "CS102",
    department: "Information Technology",
    semester: 6,
    cgpa: 8.5,
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Singh",
    roll: "CS103",
    department: "Computer Science",
    semester: 4,
    cgpa: 9.6,
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Arjun Roy",
    roll: "CS104",
    department: "Electronics",
    semester: 4,
    cgpa: 7.9,
    photo: "https://i.pravatar.cc/150?img=8",
  },
];

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <h2 className="logo">Student Portal</h2>
      </div>
    </header>
  );
}

function StudentCard({ student }: { student: Student }) {
  return (
    <div className="student-card">
      <img src={student.photo} alt={student.name} />

      <div>
        <h3>{student.name}</h3>
        <p><b>Roll No:</b> {student.roll}</p>
        <p><b>Department:</b> {student.department}</p>
        <p><b>Semester:</b> {student.semester}</p>
        <p><b>CGPA:</b> {student.cgpa}</p>
      </div>
    </div>
  );
}

function StudentList({ students }: { students: Student[] }) {
  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.roll}
          student={student}
        />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Student Information Portal
    </footer>
  );
}

function App() {
  const [sorted, setSorted] = useState(false);

  const sortedStudents = sorted
    ? [...students].sort((a, b) => b.cgpa - a.cgpa)
    : students;

  return (
    <>
      <Header />

      <main className="section">
        <div className="container">
          <div className="section-title">
            <h1>Student Information</h1>
            <p>View student academic details</p>

            <button
              className="btn"
              onClick={() => setSorted(!sorted)}
            >
              {sorted ? "Original Order" : "Sort by CGPA"}
            </button>
          </div>

          <StudentList students={sortedStudents} />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;