import {
  Users,
  UserCheck,
  GraduationCap,
  UserPlus,
  ArrowRight,
  BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard({ students = [] }) {
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

  const aiMlStudents = students.filter(
    (student) => student.course === "AI/ML"
  ).length;

  const dataScienceStudents = students.filter(
    (student) => student.course === "Data Science"
  ).length;

  const otherStudents = students.filter(
    (student) =>
      student.course !== "CSE" &&
      student.course !== "IT" &&
      student.course !== "AI/ML" &&
      student.course !== "Data Science"
  ).length;

  // =========================
  // COURSE STATISTICS
  // =========================

  const courseStats = [
    {
      name: "CSE",
      count: cseStudents,
    },
    {
      name: "IT",
      count: itStudents,
    },
    {
      name: "AI/ML",
      count: aiMlStudents,
    },
    {
      name: "Data Science",
      count: dataScienceStudents,
    },
  ];

  // =========================
  // RECENT STUDENTS
  // =========================

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

        {/* TOTAL */}

        <div className="dashboard-stat-card">

          <div className="stat-icon purple">
            <Users size={22} />
          </div>

          <div>
            <p>Total Students</p>
            <h2>{totalStudents}</h2>
          </div>

        </div>


        {/* CSE */}

        <div className="dashboard-stat-card">

          <div className="stat-icon blue">
            <GraduationCap size={22} />
          </div>

          <div>
            <p>CSE Students</p>
            <h2>{cseStudents}</h2>
          </div>

        </div>


        {/* IT */}

        <div className="dashboard-stat-card">

          <div className="stat-icon green">
            <UserCheck size={22} />
          </div>

          <div>
            <p>IT Students</p>
            <h2>{itStudents}</h2>
          </div>

        </div>


        {/* OTHER */}

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
          COURSE STATISTICS
      ========================= */}

      <div className="dashboard-section course-statistics">

        <div className="section-heading">

          <div>
            <h2>Course Statistics</h2>

            <p>
              Student distribution by course
            </p>
          </div>

          <BarChart3 size={22} />

        </div>


        <div className="course-stats-list">

          {courseStats.map((course) => {

            const percentage =
              totalStudents > 0
                ? Math.round(
                    (course.count / totalStudents) * 100
                  )
                : 0;

            return (
              <div
                className="course-stat-item"
                key={course.name}
              >

                <div className="course-stat-header">

                  <span>
                    {course.name}
                  </span>

                  <strong>
                    {course.count} students
                  </strong>

                </div>


                <div className="course-progress">

                  <div
                    className="course-progress-bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>


                <small>
                  {percentage}% of total students
                </small>

              </div>
            );
          })}

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