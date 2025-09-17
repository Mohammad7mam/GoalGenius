import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Rejester from "./pages/rejester.jsx";
import Login from "./pages/login.jsx";

import Quiz from "./pages/Quiz.jsx";
import Finished from "./pages/finished.jsx";
import BeforeQuiz from "./pages/beforeQuiz.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Rejester" element={<Rejester />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/finished" element={<Finished />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/beforeQuiz" element={<BeforeQuiz />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
);
