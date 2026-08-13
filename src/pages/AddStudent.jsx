import { ArrowLeft, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";

function AddStudent({
  onAddStudent,
  students = [],
}) {
  const navigate = useNavigate();

  const handleAddStudent = (newStudent) => {
    onAddStudent(newStudent);
    navigate("/students");
  };

  return (
    <div className="add-student-page">

      <div className="add-page-header">

        <Link
          to="/students"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <div className="add-title">

          <div className="heading-icon">
            <UserPlus size={21} />
          </div>

          <div>
            <h1>Add New Student</h1>
            <p>Create a new student record</p>
          </div>

        </div>

      </div>

      <div className="add-form-wrapper">

        <StudentForm
          onAddStudent={handleAddStudent}
          students={students}
        />

      </div>

    </div>
  );
}

export default AddStudent;