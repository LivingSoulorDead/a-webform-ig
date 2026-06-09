import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Welcome from "./components/LoginPage/Welcome";
import Designs from "./components/LoginPage/designs";
import Courses from "./components/LoginPage/Courses";
import About from "./components/LoginPage/About";
import Contact from "./components/LoginPage/Contact";

// Pages that have their own full-height fixed layout (no footer, no scroll)
const NO_FOOTER_PATHS = ["/", "/designs", "/courses"];

function Layout() {
  const location = useLocation();
  const showFooter = !NO_FOOTER_PATHS.includes(location.pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Header />
      {/*
        Scrollable wrapper: About & Contact scroll naturally here.
        Welcome, Designs, Courses fill 100% of this flex-1 area via their own CSS.
      */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page — no header, no footer */}
        <Route path="/loginn" element={<LoginPage />} />

        {/* All other pages share header + conditional footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Welcome />} />
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