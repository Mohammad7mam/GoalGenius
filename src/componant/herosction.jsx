//  import logo from "../assets/icon/logo.svg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div class="hero-container">
      <div class="hero-content">
        <h1>Hi there welcome to the GoalGenius</h1>
        <div class="buttons">
          <Link to="/Rejester" className="btn-primary">
            register now
          </Link>
          <a href="#about" className="btn-secondary">
            Learn More
          </a>

          {/* <button class="btn-primary">register now</button> */}
          {/* <img src={logo} alt="Logo" /> */}
          {/* <button class="btn-secondary">Learn More</button> */}
        </div>
      </div>
    </div>
  );
}
