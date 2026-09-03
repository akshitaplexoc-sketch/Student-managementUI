import axios from "axios";

const API_URL = "https://localhost:7020/api/Students";

const getStudents = () => axios.get(API_URL);

const getStudentById = (id) =>
    axios.get(`${API_URL}/${id}`);

const addStudent = (student) =>
    axios.post(`${API_URL}/add`, student);

const updateStudent = (student) =>
    axios.put(`${API_URL}/update`, student);

const deleteStudent = (id) =>
    axios.delete(`${API_URL}/${id}`);

const deleteAllStudents = () =>
    axios.delete(API_URL);

export default {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
};