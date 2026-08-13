import {
  Users,
  UserCheck,
  GraduationCap,
  UserPlus,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard({ students = [] }) {

  const totalStudents = students.length;

  const cseStudents = students.filter(
    (student) => student.course === "CSE"
  ).length;

  const itStudents = students.filter(
    (student) => student.course === "IT"
  ).length;

  const otherStudents =
    students.filter(
      (student) =>
        student.course !== "CSE" &&
        student.course !== "IT"
    ).length;

  // Last 3 students
  const recentStudents = [...students]
    .slice(-3)
    .reverse();

  return (
    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's an overview
            of your students.
          </p>
        </div>

        <Link
          to="/students/add"
          className="dashboard-add-btn"
        >
          <UserPlus size={18} />
          Add Student
        </Link>

      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon purple">
            <Users size={22} />
          </div>

          <div>
            <p>Total Students</p>
            <h2>{totalStudents}</h2>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon blue">
            <GraduationCap size={22} />
          </div>

          <div>
            <p>CSE Students</p>
            <h2>{cseStudents}</h2>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon green">
            <UserCheck size={22} />
          </div>

          <div>
            <p>IT Students</p>
            <h2>{itStudents}</h2>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon orange">
            <GraduationCap size={22} />
          </div>

          <div>
            <p>Other Courses</p>
            <h2>{otherStudents}</h2>
          </div>

        </div>

      </div>


      {/* =========================
          RECENT STUDENTS
      ========================= */}

      <div className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Recent Students</h2>

            <p>
              Recently added student records
            </p>
          </div>

          <Link
            to="/students"
            className="view-all-link"
          >
            View All
            <ArrowRight size={16} />
          </Link>

        </div>


        {recentStudents.length > 0 ? (

          <div className="recent-students">

            {recentStudents.map((student) => (

              <div
                className="recent-student-card"
                key={student.id}
              >

                <div className="recent-avatar">
                  {student.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="recent-info">

                  <h3>
                    {student.name}
                  </h3>

                  <p>
                    {student.course}
                  </p>

                </div>

                <Link
                  to={`/students/${student.id}`}
                  className="details-link"
                >
                  View
                </Link>

              </div>

            ))}

          </div>

        ) : (

          <div className="dashboard-empty">

            <Users size={35} />

            <h3>
              No students yet
            </h3>

            <p>
              Add your first student to get started.
            </p>

            <Link
              to="/students/add"
              className="dashboard-add-btn"
            >
              <UserPlus size={17} />
              Add Student
            </Link>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;