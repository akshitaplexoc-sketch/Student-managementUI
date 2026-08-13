import {
  ArrowLeft,
  Mail,
  Pencil,
  Phone,
  User,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

function StudentDetails({ students = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find student using ID from URL
  const student = students.find(
    (student) => student.id.toString() === id
  );

  // If student doesn't exist
  if (!student) {
    return (
      <div className="details-page">
        <h1>Student Not Found</h1>

        <Link
          to="/students"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div className="details-page">

      {/* HEADER */}

      <div className="details-header">

        <Link
          to="/students"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <h1>Student Details</h1>

        <p>
          View complete information about the student
        </p>

      </div>

      {/* STUDENT CARD */}

      <div className="details-card">

        {/* Avatar */}

        <div className="details-avatar">
          {student.name
            .charAt(0)
            .toUpperCase()}
        </div>

        {/* Name */}

        <h2>{student.name}</h2>

        <span className="details-course">
          {student.course} Student
        </span>

        {/* INFORMATION */}

        <div className="details-info">

          {/* Age */}

          <div className="info-item">

            <User size={20} />

            <div>
              <span>Age</span>
              <strong>
                {student.age}
              </strong>
            </div>

          </div>

          {/* Phone */}

          <div className="info-item">

            <Phone size={20} />

            <div>
              <span>Phone</span>
              <strong>
                {student.phone || "Not available"}
              </strong>
            </div>

          </div>

          {/* Email */}

          <div className="info-item">

            <Mail size={20} />

            <div>
              <span>Email</span>
              <strong>
                {student.email || "Not available"}
              </strong>
            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="details-buttons">

          <button
            className="edit-btn"
            onClick={() =>
              navigate(
                `/students/edit/${student.id}`
              )
            }
          >
            <Pencil size={17} />
            Edit Student
          </button>

          <Link
            to="/students"
            className="details-back-btn"
          >
            <ArrowLeft size={17} />
            Back
          </Link>

        </div>

      </div>

    </div>
  );
}

export default StudentDetails;