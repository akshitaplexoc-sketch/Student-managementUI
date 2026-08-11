function StudentCard({ name,course, age,onDelete , onEdit}) {
    return (
        <div>
            <div className="student-card">
            <div className="student-info">
            <h2>{name}</h2>
            <p>Course: {course}</p>
            <p>Age: {age}</p>
            </div>

            <div className="card-buttons">
            <button className="edit-btn" onClick={onEdit}>
            Edit
            </button>

            <button className="delete-btn" onClick={onDelete}>
            Delete
            </button>
        </div>
        </div>
        </div>
    )
}

export default StudentCard;