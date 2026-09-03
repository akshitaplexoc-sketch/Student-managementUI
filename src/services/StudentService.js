import axios from "axios";

const API_URL = "https://localhost:7020/api/Students";

const getStudents = () => {
    return axios.get(API_URL);
};

const getStudentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const addStudent = (student) => {
    return axios.post(`${API_URL}/add`, student);
};

const updateStudent = (student) => {
    return axios.put(`${API_URL}/update`, student);
};

const deleteStudent = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const deleteAllStudents = () => {
    return axios.delete(API_URL);
};

export default {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
};