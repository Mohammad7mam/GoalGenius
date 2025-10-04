import { useState } from "react";
import { useMediaQuery } from "@mui/material"; // 👈 استيراد hook من MUI
import LeftSection from "../componant/leftSection";
import Login from "../componant/login";
import Register from "../componant/regester"; // تأكد من الاسم الصحيح Register
import "../App.scss";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  // 👇 يتحقق إذا كانت الشاشة أصغر من 768px
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div className="container">
      {/* عرض LeftSection فقط عندما الشاشة أكبر من 768px */}
      {!isMobile && <LeftSection />}

      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} />
      ) : (
        <Register onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
