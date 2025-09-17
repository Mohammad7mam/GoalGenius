import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ إضافة useNavigate
import aa from "../assets/img/logo.svg";

export default function Login({ onSwitch }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ إنشاء المتغير

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (
      storedUser &&
      credentials.email === storedUser.email &&
      credentials.password === storedUser.password
    ) {

      // ✅ توجيه المستخدم إلى صفحة beforeQuiz
      navigate("/beforeQuiz");
    } else {
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="right-section">
      <header className="header">
        <div className="logo">
          <img src={aa} alt="Logo" />
        </div>
        <Link to="/" className="link">Home</Link>
      </header>
      <hr />
      <main className="form-content">
        <form onSubmit={handleSubmit} style={{ marginTop: "10vh" }}>
          <h1>Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSwitch();
              }}
            >
              Register here
            </a>
          </p>

          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    </div>
  );
}
