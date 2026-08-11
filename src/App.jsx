import { useState } from "react";
import StudentCard from "./components/StudentCard";
import StudentForm from "./components/StudentForm";
import "./App.css";
function App() {
  const [students , setStudents] = useState([
    
    {
      id: 1,
      name: "Akshita",
      course: "CSE",
      age: 20
    },
    {
      id: 2,
      name: "Rahul",
      course: "IT",
      age: 21
    },
    {
      id: 3,
      name: "Priya",
      course: "CSE",
      age: 20
    }
  ]);

  const [search, setSearch] = useState("");

  const [courseFilter, setCourseFilter] = useState("All");
  const [editingStudent, setEditingStudent] = useState(null);
  const updateStudent = (updatedStudent) => {
  setStudents(
    students.map((student) =>
      student.id === updatedStudent.id
        ? updatedStudent
        : student
    )
  );

  setEditingStudent(null);
};
const cancelEdit = () => {
  setEditingStudent(null);
}; 

  const  addStudent = (student) => {
    setStudents([...students, student]);
  };
  const courses = [...new Set(
  students.map((student) => student.course)
)];

  const filteredStudents = students
  .filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((student) =>
    courseFilter === "All" || student.course === courseFilter
  );

  const totalStudents = students.length;

const cseStudents = students.filter(
  (student) => student.course === "CSE"
).length;

const itStudents = students.filter(
  (student) => student.course === "IT"
).length;

  return (
    <div className="app">
    <div className="container"> 
      <div className="header"> 
      <h1>🎓 Student Management System </h1>
      <p>Manage and organize your students easily.</p>
      </div>
      <div className="stats-container">

  <div className="stat-card">
    <h3>Total Students</h3>
    <p>{totalStudents}</p>
  </div>

  <div className="stat-card">
    <h3>CSE Students</h3>
    <p>{cseStudents}</p>
  </div>

  <div className="stat-card">
    <h3>IT Students</h3>
    <p>{itStudents}</p>
  </div>

</div>
      <StudentForm 
      onAddStudent={addStudent}  
      onUpdateStudent={updateStudent}
      students={students}
      editingStudent={editingStudent}
      onCancelEdit={cancelEdit}
      />

      <div className="controls">
      <input
      className="search-box"
        type="text"
        placeholder="🔍 Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <select
      className="course-filter"
      value={courseFilter}
      onChange={(e) => setCourseFilter(e.target.value)}>

     <option value="All">All Courses</option>

     {courses.map((course) => (
      <option key={course} value={course}>
      {course}
     </option>
     ))}
      </select>
      </div>

      <p>Students Found: {filteredStudents.length}</p>
      <div className="students-grid">
      {filteredStudents.length > 0 ? (
  <div className="students-grid">
    {filteredStudents.map((student) => (
      <StudentCard
        key={student.id}
        name={student.name}
        course={student.course}
        age={student.age}
        onEdit={() => setEditingStudent(student)}
        onDelete={() => {
          setStudents(
            students.filter((s) => s.id !== student.id)
          );
        }}
      />
    ))}
  </div>
) : (
  <div className="no-students">
    <div className="empty-icon">🔍</div>
    <h2>No Students Found</h2>
    <p>Try changing your search or course filter.</p>

    <button
      className="clear-btn"
      onClick={() => {
        setSearch("");
        setCourseFilter("All");
      }}
    >
      Clear Filters
    </button>
  </div>
)}
      </div>
    </div>
    </div>
  );
}

export default App;
