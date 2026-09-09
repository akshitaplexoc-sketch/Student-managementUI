import { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post("https://localhost:7112/api/Auth/login", {
      username: username,
      password: password,
    });

    if (response.data && response.data.token) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      onLoginSuccess();
    } else {
      setError("Error occurred during login.");
    }
  } catch (err) {
    console.error(err);
    setError("Invalid Username or Password!");
  }
};

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f9" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Student System</h2>
        
        {error && <p style={{ color: "red", textAlign: "center", backgroundColor: "#ffeef0", padding: "8px", borderRadius: "4px", fontSize: "14px" }}>{error}</p>}
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;