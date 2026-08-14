import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  UserPlus,
  Users,
  Grid2X2,
  List,
} from "lucide-react";

import StudentCard from "../components/StudentCard";

function Students({
  students = [],
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  // =========================
  // EDIT STUDENT
  // =========================

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id}`);
  };

  // =========================
  // SEARCH + FILTER
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

  return (
    <div className="students-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-heading">

        <div className="page-heading-left">

          <div className="heading-icon">
            <Users size={22} />
          </div>

          <div>
            <h1>All Students 👨‍🎓</h1>

            <p>Manage and view all student records</p>
          </div>

        </div>

        {/* ADD STUDENT */}

        <Link
          to="/students/add"
          className="primary-btn"
        >
          <UserPlus size={18} />
          Add Student
        </Link>

      </div>


      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <div className="students-toolbar">

        {/* SEARCH */}

        <div className="student-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* COURSE FILTER */}

        <div className="student-filter">

          <Filter size={17} />

          <select
            value={courseFilter}
            onChange={(e) =>
              setCourseFilter(e.target.value)
            }
          >

            <option value="All">
              All Courses
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="IT">
              IT
            </option>

            <option value="AI/ML">
              AI/ML
            </option>

            <option value="Data Science">
              Data Science
            </option>

          </select>

        </div>

      </div>

    <div className="view-toggle">

        <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
        >
            <Grid2X2 size={17} />
        </button>

        <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
        >
            <List size={17} />
        </button>

    </div>


      {/* =========================
          RESULT HEADER
      ========================= */}

      <div className="students-result-header">

        <div>

          <h2>
            All Students 👨‍🎓
          </h2>

          <p>
            Showing {filteredStudents.length} of{" "}
            {students.length} students
          </p>

        </div>

      </div>


      {/* =========================
          STUDENT LIST
      ========================= */}

      {filteredStudents.length > 0 ? (

        <div
        className={
        viewMode === "grid"
        ? "students-page-grid"
        : "students-list"
        }
        >

          {filteredStudents.map((student) => (

            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={onDelete}

              // View Details
              onView={() =>
                navigate(
                  `/students/${student.id}`
                )
              }
            />

          ))}

        </div>

      ) : (

        /* =========================
           EMPTY STATE
        ========================= */

        <div className="students-empty">

          <Users size={40} />

          <h2>
            No Students Found
          </h2>

          <p>
            {students.length === 0
              ? "No students have been added yet."
              : "Try changing your search or course filter."
            }
          </p>


          {students.length === 0 && (

            <Link
              to="/students/add"
              className="primary-btn"
            >
              <UserPlus size={17} />
              Add First Student
            </Link>

          )}

        </div>

      )}

    </div>
  );
}

export default Students;