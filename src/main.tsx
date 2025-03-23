import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Login from "./components/Landing/Login";
import Register from "./components/Landing/Register";
import "./index.css";
import Leaderboards from "./components/Leaderboards";
import TypingSpeedTest from "./components/TypingSpeedTest";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Main" element={<App />} />
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/game" element={<TypingSpeedTest />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
