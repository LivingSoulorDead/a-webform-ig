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
import Profile from "./components/LoginPage/Profile";
import Mydes from "./components/LoginPage/Mydes";
import Myord from "./components/LoginPage/Myord";

// Pages that fill the viewport and clip content (no outer scroll, no footer)
const FIXED_PAGES = ["/", "/designs", "/courses"];

function Layout() {
  const location = useLocation();
  const isFixedPage = FIXED_PAGES.includes(location.pathname);

  if (isFixedPage) {
    // Viewport-locked layout: header + page fills remaining height exactly
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minWidth: "320px",
        overflow: "hidden",
      }}>
        <Header />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <Outlet />
        </div>
      </div>
    );
  }

  // Scrollable layout: About, Contact, Profile, Mydes, Myord — natural page scroll with footer
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      minWidth: "320px",
    }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/mydes" element={<Mydes />} />
          <Route path="/myord" element={<Myord />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/loginn" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;