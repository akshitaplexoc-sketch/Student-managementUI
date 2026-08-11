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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // When Edit button is clicked
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setCourse(editingStudent.course);
      setAge(editingStudent.age);
    } else {
      setName("");
      setCourse("");
      setAge("");
    }

    setError("");
    setSuccess("");
  }, [editingStudent]);

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    // Empty fields
    if (!name.trim() || !course.trim() || !age) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // Age validation
    if (age <= 0 || age > 100) {
      setError("⚠️ Please enter a valid age between 1 and 100");
      return;
    }

    // EDIT MODE
    if (editingStudent) {
      const updatedStudent = {
        id: editingStudent.id,
        name: name.trim(),
        course: course.trim(),
        age: age
      };

      onUpdateStudent(updatedStudent);

      setSuccess("✅ Student updated successfully!");
      return;
    }

    // ADD MODE - duplicate check
    const duplicate = students.some(
      (student) =>
        student.name.toLowerCase() === name.trim().toLowerCase() &&
        student.course.toLowerCase() === course.trim().toLowerCase()
    );

    if (duplicate) {
      setError("⚠️ This student already exists");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course: course.trim(),
      age: age
    };

    onAddStudent(newStudent);

    setName("");
    setCourse("");
    setAge("");

    setSuccess("✅ Student added successfully!");
  };

  const handleCancel = () => {
    setName("");
    setCourse("");
    setAge("");
    setError("");
    setSuccess("");

    onCancelEdit();
  };

  return (
    <div className="student-form">
      <h2>
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {success && (
        <p className="form-success">
          {success}
        </p>
      )}

      <div className="form-fields">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}>
        
        <option value="">Select Course</option>
        <option value="CSE">CSE</option>
        <option value="IT">IT</option>
        <option value="AI/ML">AI/ML</option>
        <option value="Data Science">Data Science</option>
</select>

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editingStudent ? "Update Student" : "+ Add Student"}
        </button>

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