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

  const [age, setAge] = useState(
    editingStudent?.age || ""
  );

  const [course, setCourse] = useState(
    editingStudent?.course || ""
  );

  const [phone, setPhone] = useState(
    editingStudent?.phone || ""
  );

  const [email, setEmail] = useState(
    editingStudent?.email || ""
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (
      !name.trim() ||
      !age ||
      !course ||
      !phone.trim() ||
      !email.trim()
    ) {
      setError("⚠️ Please fill all fields");
      return;
    }

    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 100) {
      setError("⚠️ Age must be between 1 and 100");
      return;
    }

    // EDIT MODE
    if (editingStudent) {
      const updatedStudent = {
        id: editingStudent.id,
        name: name.trim(),
        age: ageNumber,
        course: course,
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
      setError("⚠️ This student already exists");
      return;
    }

    // ADD STUDENT
    const newStudent = {
      name: name.trim(),
      age: ageNumber,
      course: course,
      phone: phone.trim(),
      email: email.trim(),
    };
    console.log(newStudent);
    onAddStudent(newStudent);

    // Clear form
    setName("");
    setAge("");
    setCourse("");
    setPhone("");
    setEmail("");

    setSuccess("✅ Student added successfully!");
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <div className="form-fields">
        {/* NAME */}
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* AGE */}
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min={1}
          max={100}
        />

        {/* COURSE */}
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select Course</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Data Science">Data Science</option>
        </select>

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* SUBMIT */}
        <button type="submit">
          {editingStudent ? "Update Student" : "+ Add Student"}
        </button>

        {/* CANCEL */}
        {editingStudent && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;