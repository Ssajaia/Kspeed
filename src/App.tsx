import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Landing/Login";
import Register from "./components/Landing/Register";
import TypingSpeedTest from "./components/TypingSpeedTest";
import Leaderboards from "./components/Leaderboards";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<TypingSpeedTest />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
