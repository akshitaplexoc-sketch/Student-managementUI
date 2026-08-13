import { ArrowLeft, Save, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function EditStudent({ students = [], onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find(
    (student) => student.id.toString() === id
  );

  const [name, setName] = useState(student?.name || "");
  const [course, setCourse] = useState(student?.course || "");
  const [age, setAge] = useState(student?.age || "");
  const [phone, setPhone] = useState(student?.phone || "");
  const [email, setEmail] = useState(student?.email || "");

  if (!student) {
    return (
      <div className="edit-page">
        <div className="edit-not-found">
          <h2>Student Not Found</h2>

          <Link to="/students" className="details-back-btn">
            <ArrowLeft size={17} />
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = {
      ...student,
      name,
      course,
      age,
      phone,
      email,
    };

    onUpdate(updatedStudent);

    navigate(`/students/${student.id}`);
  };

  return (
    <div className="edit-page">

      {/* HEADER */}

      <div className="edit-header">

        <Link to={`/students/${student.id}`} className="back-link">
          <ArrowLeft size={17} />
          Back to Student Details
        </Link>

        <div className="edit-title">
          <div className="edit-title-icon">
            <User size={23} />
          </div>

          <div>
            <h1>Edit Student</h1>
            <p>Update student information</p>
          </div>
        </div>

      </div>

      {/* FORM CARD */}

      <div className="edit-card">

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="form-group">
            <label>Student Name</label>

            <input
              type="text"
              value={name}
              placeholder="Enter student name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* COURSE */}

          <div className="form-group">
            <label>Course</label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="">Select Course</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Data Science">
                Data Science
              </option>
            </select>
          </div>

          {/* AGE */}

          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              value={age}
              placeholder="Enter age"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              value={phone}
              placeholder="Enter phone number"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* BUTTONS */}

          <div className="edit-buttons">

            <Link
              to={`/students/${student.id}`}
              className="cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="save-btn"
            >
              <Save size={17} />
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditStudent;