import { useEffect, useState } from "react";

function StudentForm({
  onAddStudent,
  students = [],
  editingStudent,
  onUpdateStudent,
  onCancelEdit,
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
      setName(editingStudent.name);
      setCourse(editingStudent.course);
      setAge(editingStudent.age);
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
  // ADD / UPDATE STUDENT
  // =========================

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    // Empty field validation
    if (!name.trim() || !course || !age || !phone.trim() || !email.trim()) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // Age validation
    if (Number(age) <= 0 || Number(age) > 100) {
      setError("⚠️ Please enter a valid age between 1 and 100");
      return;
    }

    // =========================
    // EDIT MODE
    // =========================

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

      setSuccess("✅ Student updated successfully!");

      return;
    }

    // =========================
    // ADD MODE
    // =========================

    const duplicate = students.some(
      (student) =>
        student.name.toLowerCase() ===
          name.trim().toLowerCase() &&
        student.course.toLowerCase() ===
          course.toLowerCase()
    );

    if (duplicate) {
      setError("⚠️ This student already exists");
      return;
    }

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

    setSuccess("✅ Student added successfully!");
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

      {/* Error Message */}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {/* Success Message */}

      {success && (
        <p className="form-success">
          {success}
        </p>
      )}

      <div className="form-fields">

        {/* Student Name */}

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        {/* Course */}

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

        {/* Age */}

        <input
          type="number"
          placeholder="Age"
          min="1"
          max="100"
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Submit Button */}

        <button onClick={handleSubmit}>
          {editingStudent
            ? "Update Student"
            : "+ Add Student"}
        </button>

        {/* Cancel Button */}

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