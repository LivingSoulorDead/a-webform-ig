import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Projs.css";
 
function Projs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = location.state?.username || localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/loginn", { replace: true });
      return;
    }
    setUsername(storedUsername);
  }, [location.state, navigate]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => navigate("/", { replace: true });
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h2>Welcome back, {username}!</h2>
      </div>
    </div>
  );
}
export default Projs;