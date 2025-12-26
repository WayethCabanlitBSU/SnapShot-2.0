import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
