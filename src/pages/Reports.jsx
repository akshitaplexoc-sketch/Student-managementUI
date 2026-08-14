import {
  Users,
  GraduationCap,
  BarChart3,
  FileText,
} from "lucide-react";

function Reports({ students = [] }) {

  // =========================
  // COURSE COUNTS
  // =========================

  const courses = [
    "CSE",
    "IT",
    "AI/ML",
    "Data Science",
  ];

  const totalStudents = students.length;

  // =========================
  // COURSE STATISTICS
  // =========================

  const courseReports = courses.map((course) => {

    const count = students.filter(
      (student) => student.course === course
    ).length;

    const percentage =
      totalStudents > 0
        ? Math.round(
            (count / totalStudents) * 100
          )
        : 0;

    return {
      course,
      count,
      percentage,
    };
  });

  return (
    <div className="reports-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="reports-header">

        <div>
          <h1>Reports</h1>

          <p>
            View student statistics and course reports
          </p>
        </div>

        <div className="reports-header-icon">
          <BarChart3 size={25} />
        </div>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="reports-summary">

        <div className="report-summary-card">

          <div className="report-icon purple">
            <Users size={22} />
          </div>

          <div>
            <span>Total Students</span>
            <h2>{totalStudents}</h2>
          </div>

        </div>


        <div className="report-summary-card">

          <div className="report-icon blue">
            <GraduationCap size={22} />
          </div>

          <div>
            <span>Total Courses</span>
            <h2>{courses.length}</h2>
          </div>

        </div>


        <div className="report-summary-card">

          <div className="report-icon green">
            <FileText size={22} />
          </div>

          <div>
            <span>Student Records</span>
            <h2>{students.length}</h2>
          </div>

        </div>

      </div>


      {/* =========================
          COURSE REPORT
      ========================= */}

      <div className="reports-card">

        <div className="reports-card-header">

          <div>
            <h2>Course-wise Report</h2>

            <p>
              Distribution of students across courses
            </p>
          </div>

        </div>


        <div className="report-table-wrapper">

          <table className="report-table">

            <thead>

              <tr>
                <th>Course</th>
                <th>Students</th>
                <th>Percentage</th>
                <th>Distribution</th>
              </tr>

            </thead>


            <tbody>

              {courseReports.map((report) => (

                <tr key={report.course}>

                  <td>
                    <strong>
                      {report.course}
                    </strong>
                  </td>

                  <td>
                    {report.count}
                  </td>

                  <td>
                    {report.percentage}%
                  </td>

                  <td>

                    <div className="report-progress">

                      <div
                        className="report-progress-bar"
                        style={{
                          width: `${report.percentage}%`,
                        }}
                      />

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          STUDENT RECORDS
      ========================= */}

      <div className="reports-card">

        <div className="reports-card-header">

          <div>
            <h2>Student Records</h2>

            <p>
              Complete list of registered students
            </p>
          </div>

        </div>


        {students.length > 0 ? (

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>

              </thead>


              <tbody>

                {students.map((student) => (

                  <tr key={student.id}>

                    <td>
                      <strong>
                        {student.name}
                      </strong>
                    </td>

                    <td>
                      <span className="course-tag">
                        {student.course}
                      </span>
                    </td>

                    <td>
                      {student.age}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.phone}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="reports-empty">

            <Users size={40} />

            <h3>
              No Student Records
            </h3>

            <p>
              Add students to generate reports.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Reports;