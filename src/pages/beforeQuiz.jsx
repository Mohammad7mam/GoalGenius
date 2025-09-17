import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser && storedUser.firstName) {
      setUserName(storedUser.firstName);
    }
  }, []);

  return (
    <div className="hero-container1">
      <div className="hero1-content">
        <h1>Hi {userName ? userName : "there"}, welcome to the QuizBall</h1>

        <div className="buttons">
          <Link to="/quiz" className="btn-primary">
            start quiz
          </Link>
          {/* <Link to="/Login" className="btn-secondary">Learn More</Link> */}

          {/* <button class="btn-primary">register now</button> */}
          {/* <img src={logo} alt="Logo" /> */}
          {/* <button class="btn-secondary">Learn More</button> */}
        </div>
      </div>
    </div>
  );
}
