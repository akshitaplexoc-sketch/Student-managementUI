import { Mail, Phone, Pencil, Trash2 } from "lucide-react";

function StudentCard({
  name,
  course,
  age,
  phone,
  email,
  onDelete,
  onEdit
}) {
  return (
    <div className="student-card">

      <div className="student-avatar">
        {name.charAt(0).toUpperCase()}
      </div>

      <h2>{name}</h2>

      <div className="student-details">
        <span className="course-badge">
          {course}
        </span>

        <span className="age-text">
          Age: {age}
        </span>
      </div>

      <div className="student-contact">

        <p>
          <Phone size={16} />
          {phone}
        </p>

        <p>
          <Mail size={16} />
          {email}
        </p>

      </div>

      <div className="card-buttons">

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}

export default StudentCard;