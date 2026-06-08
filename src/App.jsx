import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Welcome from "./components/LoginPage/Welcome";
import Designs from "./components/LoginPage/designs";
import Courses from "./components/LoginPage/Courses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginn" element={<LoginPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<Navigate to="/loginn" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;