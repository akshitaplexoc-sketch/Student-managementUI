import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentService from "./services/StudentService";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD STUDENTS
  // =========================

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await StudentService.getStudents();

      setStudents(response.data);
      setError("");
    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // =========================
  // ADD STUDENT
  // =========================

  const addStudent = async (student) => {
    try {
      const response = await StudentService.addStudent(student);
      console.log("Student Added:", response.data);

      await loadStudents();
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.error(error);
    }
  };

  // =========================
  // UPDATE STUDENT
  // =========================

  const updateStudent = async (student) => {
    try {
      await StudentService.updateStudent(student);
      await loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const deleteStudent = async (id) => {
    try {
      await StudentService.deleteStudent(id);
      await loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // DELETE ALL STUDENTS
  // =========================

  const resetStudents = async () => {
    try {
      await StudentService.deleteAllStudents();
      await loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="main-area">
          <Header />

          <main className="page-content">
            <Routes>
              <Route
                path="/"
                element={<Dashboard students={students} />}
              />

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

              <Route
                path="/reports"
                element={<Reports students={students} />}
              />

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