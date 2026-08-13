import { useEffect, useState } from "react";

function StudentForm({
  onAddStudent,
  students = [],
  editingStudent,
  onUpdateStudent,
  onCancelEdit
}) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // EDIT MODE
  // =========================

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name || "");
      setCourse(editingStudent.course || "");
      setAge(editingStudent.age || "");
      setPhone(editingStudent.phone || "");
      setEmail(editingStudent.email || "");
    } else {
      setName("");
      setCourse("");
      setAge("");
      setPhone("");
      setEmail("");
    }

    setError("");
    setSuccess("");
  }, [editingStudent]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    // Empty fields
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
    if (age <= 0 || age > 100) {
      setError(
        "⚠️ Please enter a valid age between 1 and 100"
      );
      return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      setError(
        "⚠️ Please enter a valid 10-digit phone number"
      );
      return;
    }

    // Email validation
    if (!email.includes("@")) {
      setError(
        "⚠️ Please enter a valid email address"
      );
      return;
    }

    // =========================
    // UPDATE STUDENT
    // =========================

    if (editingStudent) {
      const updatedStudent = {
        id: editingStudent.id,
        name: name.trim(),
        course: course,
        age: age,
        phone: phone.trim(),
        email: email.trim()
      };

      onUpdateStudent(updatedStudent);

      setSuccess(
        "✅ Student updated successfully!"
      );

      return;
    }

    // =========================
    // DUPLICATE CHECK
    // =========================

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

    // =========================
    // ADD STUDENT
    // =========================

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course: course,
      age: age,
      phone: phone.trim(),
      email: email.trim()
    };

    onAddStudent(newStudent);

    // Clear fields
    setName("");
    setCourse("");
    setAge("");
    setPhone("");
    setEmail("");

    setSuccess(
      "✅ Student added successfully!"
    );
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancel = () => {
    setName("");
    setCourse("");
    setAge("");
    setPhone("");
    setEmail("");

    setError("");
    setSuccess("");

    onCancelEdit();
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="student-form">

      <h2>
        {editingStudent
          ? "Edit Student"
          : "Add New Student"}
      </h2>

      {/* ERROR MESSAGE */}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {/* SUCCESS MESSAGE */}

      {success && (
        <p className="form-success">
          {success}
        </p>
      )}

      {/* FORM FIELDS */}

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

        {/* ADD / UPDATE */}

        <button onClick={handleSubmit}>
          {editingStudent
            ? "Update Student"
            : "+ Add Student"}
        </button>

        {/* CANCEL */}

        {editingStudent && (
          <button
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