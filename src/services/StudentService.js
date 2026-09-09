import axios from "axios";

const API_URL = "https://localhost:7112/api/Students";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getStudents = () => {
    return axios.get(API_URL, { headers: getAuthHeader() })
        .then(response => response.data || []);
};

const getStudentById = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() })
        .then(response => response.data);
};

const addStudent = (student) => {
    return axios.post(API_URL, student, { headers: getAuthHeader() })
        .then(response => response.data);
};

const updateStudent = (student) => {
    return axios.put(`${API_URL}/${student.id}`, student, { headers: getAuthHeader() })
        .then(response => response.data);
};

const deleteStudent = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() })
        .then(response => response.data);
};

const deleteAllStudents = () => {
    return axios.delete(API_URL, { headers: getAuthHeader() })
        .then(response => response.data);
};

export default {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
};