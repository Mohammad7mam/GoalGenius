import { useState } from "react";
import { useMediaQuery } from "@mui/material"; // 👈 استيراد hook من MUI
import LeftSection from "../componant/leftSection";
import Login from "../componant/login";
import Register from "../componant/regester";
import "../App.scss";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  // 👇 تحقق مما إذا كان عرض الشاشة أقل من 768px
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div className="container">
      {/* إظهار اليسار فقط لما الشاشة أكبر من 768 */}
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
