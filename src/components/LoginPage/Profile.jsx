import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
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
    <div className="profile-container">
        <div className="profile-content">
            <h2>Welcome back, {username}!</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
    </div>
    );
}
export default Profile;