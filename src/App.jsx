import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import Login from "./pages/Login"; // 👈 Added Login Page import

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // 🔒 Authentication tracking state
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // =========================
  // LOAD STUDENTS
  // =========================
  const loadStudents = async () => {
    if (!isAuthenticated) return; // Stop execution if token is missing
    
    try {
      setLoading(true);
      const data = await StudentService.getStudents();
      setStudents(data || []);
      setError("");
    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
      
      // Auto logout if the backend rejects the token with a 401 Unauthorized status
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        setError("Failed to load students");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [isAuthenticated]);

  // =========================
  // LOGIN / LOGOUT HANDLERS
  // =========================
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setStudents([]);
  };

  // =========================
  // ADD STUDENT
  // =========================
  const addStudent = async (student) => {
    try {
      const data = await StudentService.addStudent(student);
      console.log("Student Added Successfully:", data);
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

  // Render Login flow if the user is unauthenticated
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Passed handleLogout function downward into your Sidebar component */}
        <Sidebar onLogout={handleLogout} />

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
                element = {
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
              
              {/* Fallback routing protection strategy */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;