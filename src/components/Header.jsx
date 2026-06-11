import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [homeOpen, setHomeOpen]       = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const homeRef    = useRef(null);
  const profileRef = useRef(null);
  const mobileRef  = useRef(null);

  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    function handleClickOutside(e) {
      if (homeRef.current    && !homeRef.current.contains(e.target))    setHomeOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (mobileRef.current  && !mobileRef.current.contains(e.target))  setMobileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
    setHomeOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/loginn", { replace: true });
  };

  return (
    <header className="header">
      <span className="header-logo" onClick={() => go("/")}>MyForm</span>

      {/* ── Desktop nav ── */}
      <nav className="header-nav desktop-nav">
        <div className="nav-dropdown" ref={homeRef}>
          <button className="nav-btn"
            onClick={() => { setHomeOpen(o => !o); setProfileOpen(false); }}
            aria-expanded={homeOpen}>
            Home <span className={`caret ${homeOpen ? "open" : ""}`}>▾</span>
          </button>
          {homeOpen && (
            <div className="dropdown-menu">
              <button onClick={() => { go("/designs"); }}>Designs</button>
              <button onClick={() => { go("/courses"); }}>Courses</button>
            </div>
          )}
        </div>

        <a href="/about"   className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>

        <div className="nav-dropdown profile-dropdown" ref={profileRef}>
          <button className="nav-btn profile-btn"
            onClick={() => { setProfileOpen(o => !o); setHomeOpen(false); }}
            aria-expanded={profileOpen}>
            <span className="avatar">{username.charAt(0).toUpperCase()}</span>
            <span className={`caret ${profileOpen ? "open" : ""}`}>▾</span>
          </button>
          {profileOpen && (
            <div className="dropdown-menu dropdown-right">
              <div className="dropdown-header">
                <span className="avatar lg">{username.charAt(0).toUpperCase()}</span>
                <div><div className="dh-name">{username}</div></div>
              </div>
              <hr className="dropdown-divider" />
              <button onClick={() => { go("/profile"); }}>View Profile</button>
              <hr className="dropdown-divider" />
              <button className="logout-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile: hamburger button ── */}
      <button
        className="hamburger"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        <span className={`ham-line ${mobileOpen ? "open" : ""}`} />
        <span className={`ham-line ${mobileOpen ? "open" : ""}`} />
        <span className={`ham-line ${mobileOpen ? "open" : ""}`} />
      </button>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="mobile-menu" ref={mobileRef}>
          <div className="mobile-user">
            <span className="avatar lg">{username.charAt(0).toUpperCase()}</span>
            <span className="mobile-username">{username}</span>
          </div>
          <hr className="dropdown-divider" />
          <button className="mobile-item" onClick={() => go("/")}>Home</button>
          <button className="mobile-item" onClick={() => go("/designs")}>Designs</button>
          <button className="mobile-item" onClick={() => go("/courses")}>Courses</button>
          <button className="mobile-item" onClick={() => go("/about")}>About</button>
          <button className="mobile-item" onClick={() => go("/contact")}>Contact</button>
          <button className="mobile-item" onClick={() => go("/profile")}>Profile</button>
          <hr className="dropdown-divider" />
          <button className="mobile-item logout-item" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;