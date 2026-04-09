import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./Pages/Home";
import Mood from "./Pages/Mood";
import Stress from "./Pages/Stress";
import Personality from "./Pages/Personality";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/stress" element={<Stress />} />
        <Route path="/personality" element={<Personality />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
