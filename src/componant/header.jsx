// import React, { useEffect, useState } from "react";
// import LogoSvg from "../svg/LogoSvg";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [scrollUp, setScrollUp] = useState(true);
//   const [lastScrollTop, setLastScrollTop] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;
//       setScrolled(currentScroll > 0);

//       if (currentScroll > lastScrollTop && currentScroll > 100) {
//         setScrollUp(false); // Scrolling down
//       } else {
//         setScrollUp(true); // Scrolling up
//       }

//       setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollTop]);

//   return (
//     <header
//       className={`custom-header ${scrolled ? "custom-header--scrolled" : ""} ${scrollUp ? "show" : "hide"}`}
//     >
//       <div className="custom-header__container">
//         <div className="custom-header__logo">
//           <LogoSvg
//             fill1={scrolled ? "#27A568" : "#fff"}
//             fill2={scrolled ? "#005F2D" : "#fff"}
//             fill3={scrolled ? "#27A568" : "#fff"}
//           />
//         </div>

//         <nav className="custom-header__nav">
//           <Link to="/" className="link">Home</Link>
//           <a href="#about">About</a>
//           <a href="#contact">API content</a>
//         </nav>

//         <Link to="/Login" className="custom-header__login-btn">Login</Link>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import LogoSvg from "../svg/LogoSvg";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // تفعيل الكلاس إذا تم التمرير للأسفل
      setScrolled(currentScroll > 0);

      // إذا نزل للأسفل وأبعد من 100px، نخفي الهيدر
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        setScrollUp(false);
      } else {
        setScrollUp(true);
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <header
      className={`custom-header 
        ${scrolled ? "custom-header--scrolled" : ""} 
        ${scrollUp ? "custom-header--show" : "custom-header--hide"}`}
    >
      <div className="custom-header__container">
        <div className="custom-header__logo">
          <LogoSvg
            fill1={scrolled ? "#27A568" : "#fff"}
            fill2={scrolled ? "#005F2D" : "#fff"}
            fill3={scrolled ? "#27A568" : "#fff"}
          />
        </div>

        <nav className="custom-header__nav">
          <Link to="/" className="link">Home</Link>
          <a href="#about">About</a>
          <a href="#contact">API content</a>
        </nav>

        <Link to="/Login" className="custom-header__login-btn">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;

