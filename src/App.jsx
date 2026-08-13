import { LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import "./App.css";
import StudentCard from "./components/StudentCard";
import StudentForm from "./components/StudentForm";

function App() {
  // =========================
  // STUDENTS DATA
  // =========================

  const [students, setStudents] = useState([
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
  }
]);

  // =========================
  // STATES
  // =========================

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // =========================
  // ADD STUDENT
  // =========================

  const addStudent = (newStudent) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      newStudent,
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

    setEditingStudent(null);
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  // =========================
  // DYNAMIC COURSES
  // =========================

  const courses = [
    ...new Set(
      students.map((student) => student.course)
    ),
  ];

  // =========================
  // FILTER STUDENTS
  // =========================

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCourse =
      courseFilter === "All" ||
      student.course === courseFilter;

    return matchesSearch && matchesCourse;
  });

  // =========================
  // STATISTICS
  // =========================

  const totalStudents = students.length;

  const cseStudents = students.filter(
    (student) => student.course === "CSE"
  ).length;

  const itStudents = students.filter(
    (student) => student.course === "IT"
  ).length;

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setCourseFilter("All");
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="app">
      <div className="container">

        {/* HEADER */}

        <div className="header">

        <LayoutDashboard
          size={40}
          className="header-icon"
        />
        <h1>Student Management System</h1>
        <p>
           Manage and organize your students easily
        </p>

</div>

        <div className="settings-section">

          <button className="settings-btn">
            <Settings size={18} />
            Settings
          </button>

        </div>

        {/* STATISTICS */}

        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{totalStudents}</p>
          </div>

          <div className="stat-card">
            <h3>CSE Students</h3>
            <p>{cseStudents}</p>
          </div>

          <div className="stat-card">
            <h3>IT Students</h3>
            <p>{itStudents}</p>
          </div>

        </div>

        {/* STUDENT FORM */}

        <StudentForm
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          students={students}
          editingStudent={editingStudent}
          onCancelEdit={cancelEdit}
        />

        {/* SEARCH AND FILTER */}

        <div className="search-section">

          <input
            type="text"
            placeholder="🔍 Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="course-filter"
            value={courseFilter}
            onChange={(e) =>
              setCourseFilter(e.target.value)
            }
          >
            <option value="All">
              All Courses
            </option>

            {courses.map((course) => (
              <option
                key={course}
                value={course}
              >
                {course}
              </option>
            ))}
          </select>

        </div>

        {/* STUDENT LIST */}

        {filteredStudents.length > 0 ? (

          <div className="students-grid">

            {filteredStudents.map((student) => (

              <StudentCard
                key={student.id}
                name={student.name}
                course={student.course}
                age={student.age}
                phone={student.phone}
                email={student.email}
                

                onEdit={() =>
                  setEditingStudent(student)
                }

                onDelete={() =>
                  setStudentToDelete(student)
                }
              />

            ))}

          </div>

        ) : (

          /* NO STUDENTS FOUND */

          <div className="no-students">

            <div className="empty-icon">
              🔍
            </div>

            <h2>
              No Students Found
            </h2>

            <p>
              Try changing your search or
              course filter.
            </p>

            <button
              className="clear-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        )}

        {/* =========================
            DELETE MODAL
        ========================= */}

        {studentToDelete && (

          <div className="modal-overlay">

            <div className="delete-modal">

              <div className="modal-icon">
                ⚠️
              </div>

              <h2>
                Delete Student?
              </h2>

              <p>
                Are you sure you want to
                delete{" "}
                <strong>
                  {studentToDelete.name}
                </strong>
                ?
              </p>

              <div className="modal-buttons">

                {/* CANCEL */}

                <button
                  className="modal-cancel"
                  onClick={() =>
                    setStudentToDelete(null)
                  }
                >
                  Cancel
                </button>

                {/* DELETE */}

                <button
                  className="modal-delete"
                  onClick={() => {

                    setStudents(
                      (prevStudents) =>
                        prevStudents.filter(
                          (student) =>
                            student.id !==
                            studentToDelete.id
                        )
                    );

                    setStudentToDelete(null);
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default App;