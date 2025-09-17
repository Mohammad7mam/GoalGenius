import { useState } from "react";
import LeftSection from "../componant/leftSection";
import Login from "../componant/login";
import Register from "../componant/regester"; // تأكد من الاسم الصحيح Register
import "../App.scss";

function App() {
  const [showLogin, setShowLogin] = useState(true); // التحكم بالعرض

  return (
    <div className="container">
      <LeftSection />

      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} />
      ) : (
        <Register onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
