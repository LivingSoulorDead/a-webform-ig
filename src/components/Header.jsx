import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [homeOpen, setHomeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const homeRef = useRef(null);
  const profileRef = useRef(null);

  const username = localStorage.getItem("username") || "User";

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (homeRef.current && !homeRef.current.contains(e.target)) setHomeOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/loginn", { replace: true });
  };

  return (
    <header className="header">
      <span className="header-logo" onClick={() => navigate("/")}>MyForm</span>

      <nav className="header-nav">
        {/* Home dropdown */}
        <div className="nav-dropdown" ref={homeRef}>
          <button
            className="nav-btn"
            onClick={() => { setHomeOpen(o => !o); setProfileOpen(false); }}
            aria-expanded={homeOpen}
          >
            Home <span className={`caret ${homeOpen ? "open" : ""}`}>▾</span>
          </button>
          {homeOpen && (
            <div className="dropdown-menu">
              <button onClick={() => { navigate("/designs"); setHomeOpen(false); }}>🎨 Designs</button>
              <button onClick={() => { navigate("/courses"); setHomeOpen(false); }}>📚 Courses</button>
            </div>
          )}
        </div>

        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>

        {/* Profile dropdown */}
        <div className="nav-dropdown profile-dropdown" ref={profileRef}>
          <button
            className="nav-btn profile-btn"
            onClick={() => { setProfileOpen(o => !o); setHomeOpen(false); }}
            aria-expanded={profileOpen}
          >
            <span className="avatar">{username.charAt(0).toUpperCase()}</span>
            <span className="profile-name">{username}</span>
            <span className={`caret ${profileOpen ? "open" : ""}`}>▾</span>
          </button>
          {profileOpen && (
            <div className="dropdown-menu dropdown-right">
              <div className="dropdown-header">
                <span className="avatar lg">{username.charAt(0).toUpperCase()}</span>
                <div>
                  <div className="dh-name">{username}</div>
                  <div className="dh-role">Member</div>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <button onClick={() => { navigate("/about"); setProfileOpen(false); }}>👤 View Profile</button>
              <button onClick={() => { navigate("/courses"); setProfileOpen(false); }}>📚 My Courses</button>
              <button onClick={() => { navigate("/designs"); setProfileOpen(false); }}>🎨 My Designs</button>
              <hr className="dropdown-divider" />
              <button className="logout-item" onClick={handleLogout}>🚪 Logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;