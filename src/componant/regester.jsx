import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import aa from "../assets/img/logo.svg";

export default function Register({ onSwitch }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem("userData"));

    // تحقق إذا كان هناك مستخدم بنفس الإيميل
    if (existingUser && existingUser.email === formData.email) {
      alert("User already exists with this email ❌");
      return;
    }

    // إذا لم يوجد، خزّن المستخدم
    localStorage.setItem("userData", JSON.stringify(formData));

    // ✅ الانتقال إلى صفحة beforeQuiz
    navigate("/beforeQuiz");
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
        <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSwitch();
              }}
            >
              Login here
            </a>
          </p>

          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </main>
    </div>
  );
}
