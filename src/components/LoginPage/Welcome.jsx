import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./welcindex.css";

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername =
      location.state?.username || localStorage.getItem("username");

    if (!storedUsername) {
      navigate("/", { replace: true });
      return;
    }

    setUsername(storedUsername);
  }, [location.state, navigate]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      navigate("/welcome", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/", { replace: true });
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h2>Welcome back, {username}!</h2>

        <button className="btn1" onClick={() => navigate("/designs")}>
          Show All Designs
        </button>

        <button className="btn2" onClick={() => navigate("/courses")}>
          Show Available Courses
        </button>
        
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Welcome;