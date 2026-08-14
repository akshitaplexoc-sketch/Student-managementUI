import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";

function App() {

  // =========================
  // STUDENTS STATE
  // =========================

  const defaultStudents = [
  {
    id: 1,
    name: "Akshita",
    course: "CSE",
    age: 20,
    phone: "9876543210",
    email: "akshita@gmail.com"
  },
  {
    id: 2,
    name: "Rahul",
    course: "IT",
    age: 21,
    phone: "9876543211",
    email: "rahul@gmail.com"
  },
  {
    id: 3,
    name: "Priya",
    course: "CSE",
    age: 20,
    phone: "9876543212",
    email: "priya@gmail.com"
  },
  {
    id: 4,
    name: "Neha",
    course: "AI/ML",
    age: 21,
    phone: "9876543213",
    email: "neha@gmail.com"
  },
  {
    id: 5,
    name: "Aman",
    course: "Data Science",
    age: 22,
    phone: "9876543214",
    email: "aman@gmail.com"
  },
  {
    id: 6,
    name: "Riya",
    course: "IT",
    age: 20,
    phone: "9876543215",
    email: "riya@gmail.com"
  }
];

  const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students");

  return savedStudents
    ? JSON.parse(savedStudents)
    : defaultStudents;
  });

  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  // =========================
  // ADD STUDENT
  // =========================

  const addStudent = (newStudent) => {

    setStudents((prevStudents) => [
      ...prevStudents,
      {
        ...newStudent,
        id: Date.now()
      }
    ]);

  };

  // =========================
  // UPDATE STUDENT
  // =========================

  const updateStudent = (updatedStudent) => {

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );

  };

  // =========================
  // DELETE STUDENT
  // =========================

  const deleteStudent = (studentId) => {

    setStudents((prevStudents) =>
      prevStudents.filter(
        (student) =>
          student.id !== studentId
      )
    );

  };

  const resetStudents = () => {
    setStudents([]);
      localStorage.removeItem("students");
  };

  return (
    <BrowserRouter>

      <div className="app-layout">

        {/* SIDEBAR */}

        <Sidebar />

        {/* MAIN AREA */}

        <div className="main-area">

          <Header />

          <main className="page-content">

            <Routes>

              {/* DASHBOARD */}

              <Route
                path="/"
                element={
                  <Dashboard
                    students={students}
                  />
                }
              />

              {/* STUDENTS */}

              <Route
                path="/students"
                element={
                  <Students
                    students={students}
                    onDelete={deleteStudent}
                    onUpdateStudent={updateStudent}
                  />
                }
              />

              {/* ADD STUDENT */}

              <Route
                path="/students/add"
                element={
                  <AddStudent
                    onAddStudent={addStudent}
                    students={students}
                  />
                }
              />
               <Route
                path="/students/:id"
                element={
                  <StudentDetails
                    students={students}
                  />
                }
              />

               <Route
                path="/students/edit/:id"
                element={
                  <EditStudent
                    students={students}
                    onUpdateStudent={updateStudent}
                  />
                }
              />



              {/* REPORTS */}

              <Route
                path="/reports"
                element={
                  <Reports
                    students={students}
                  />
                }
              />

              {/* SETTINGS */}

              <Route
                  path="/settings"
                  element={
                    <Settings
                      onResetStudents={resetStudents}
                    />
                  }
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;