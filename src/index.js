import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home.jsx";
import Rejester from "./pages/rejester.jsx";
import Login from "./pages/login.jsx";
import Quiz from "./pages/Quiz.jsx";
import Finished from "./pages/finished.jsx";
import BeforeQuiz from "./pages/beforeQuiz.jsx";

// ✅ استيراد الميدل وير
import ProtectedRoute from "./componant/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Rejester" element={<Rejester />} />
        <Route path="/Login" element={<Login />} />

        {/* ✅ الصفحات المحمية */}
        <Route
          path="/beforeQuiz"
          element={
            <ProtectedRoute>
              <BeforeQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finished"
          element={
            <ProtectedRoute>
              <Finished />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
