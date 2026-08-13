import {
  Mail,
  Phone,
  Pencil,
  Trash2
} from "lucide-react";

function StudentCard({
  student,
  onEdit,
  onDelete
}) {

  return (
    <div className="student-card">

      {/* Avatar */}

      <div className="student-avatar">

        {student.name
          .charAt(0)
          .toUpperCase()}

      </div>

      {/* Name */}

      <h2>
        {student.name}
      </h2>

      {/* Course + Age */}

      <div className="student-info-row">

        <span className="course-badge">
          {student.course}
        </span>

        <span className="age-text">
          Age {student.age}
        </span>

      </div>

      {/* Contact */}

      <div className="student-contact">

        <p>
          <Phone size={15} />

          {student.phone}
        </p>

        <p>
          <Mail size={15} />

          {student.email}
        </p>

      </div>

      {/* Buttons */}

      <div className="student-card-actions">

        <button
          className="card-edit-btn"
          onClick={() =>
            onEdit(student)
          }
        >

          <Pencil size={15} />

          Edit

        </button>

        <button
          className="card-delete-btn"
          onClick={() =>
            onDelete(student.id)
          }
        >

          <Trash2 size={15} />

          Delete

        </button>

      </div>

    </div>
  );
}

export default StudentCard;