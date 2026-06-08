import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Welcome from "./components/LoginPage/Welcome";
import Designs from "./components/LoginPage/designs";
import Courses from "./components/LoginPage/Courses";
import About from "./components/LoginPage/About";
import Contact from "./components/LoginPage/Contact";

// Layout for pages that should have the common header
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without header */}
        <Route path="/loginn" element={<LoginPage />} />

        {/* Pages with common header */}
        <Route element={<Layout />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/loginn" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;