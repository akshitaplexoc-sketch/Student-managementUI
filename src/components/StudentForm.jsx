import { useState } from "react";

function StudentForm({
  onAddStudent,
  students = [],
  editingStudent,
  onUpdateStudent,
  onCancelEdit,
}) {
  const [name, setName] = useState(
    editingStudent?.name || ""
  );

  const [course, setCourse] = useState(
    editingStudent?.course || ""
  );

  const [age, setAge] = useState(
    editingStudent?.age || ""
  );

  const [phone, setPhone] = useState(
    editingStudent?.phone || ""
  );

  const [email, setEmail] = useState(
    editingStudent?.email || ""
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    // Validation
    if (
      !name.trim() ||
      !course ||
      !age ||
      !phone.trim() ||
      !email.trim()
    ) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // Age validation
    if (Number(age) < 1 || Number(age) > 100) {
      setError(
        "⚠️ Age must be between 1 and 100"
      );
      return;
    }

    // EDIT MODE
    if (editingStudent) {
      const updatedStudent = {
        id: editingStudent.id,
        name: name.trim(),
        course: course,
        age: Number(age),
        phone: phone.trim(),
        email: email.trim(),
      };

      onUpdateStudent(updatedStudent);

      return;
    }

    // Duplicate check
    const duplicate = students.some(
      (student) =>
        student.name.toLowerCase() ===
          name.trim().toLowerCase() &&
        student.course.toLowerCase() ===
          course.toLowerCase()
    );

    if (duplicate) {
      setError(
        "⚠️ This student already exists"
      );
      return;
    }

    // ADD STUDENT
    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course: course,
      age: Number(age),
      phone: phone.trim(),
      email: email.trim(),
    };

    onAddStudent(newStudent);

    // Clear form
    setName("");
    setCourse("");
    setAge("");
    setPhone("");
    setEmail("");

    setSuccess(
      "✅ Student added successfully!"
    );
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <div className="student-form">

      <h2>
        {editingStudent
          ? "Edit Student"
          : "Add New Student"}
      </h2>

      {/* ERROR */}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {/* SUCCESS */}

      {success && (
        <p className="form-success">
          {success}
        </p>
      )}

      <div className="form-fields">

        {/* NAME */}

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        {/* COURSE */}

        <select
          value={course}
          onChange={(e) =>
            setCourse(e.target.value)
          }
        >
          <option value="">
            Select Course
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

        {/* AGE */}

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
        />

        {/* PHONE */}

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* SUBMIT */}

        <button onClick={handleSubmit}>
          {editingStudent
            ? "Update Student"
            : "+ Add Student"}
        </button>

        {/* CANCEL */}

        {editingStudent && (
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}

      </div>
    </div>
  );
}

export default StudentForm;