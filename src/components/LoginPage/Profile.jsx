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

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/loginn", { replace: true });
  };
    return (    
    <div className="profile-container">
      <div className="profiler">
        <div className="profile-content">
            <h2>Hello {username}</h2>
            <br />
            <br />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <br />
        <br />
        <div className="profile buttons-des">
      <button className="profile-button" onClick={() => navigate("/mydes")}>My Designs</button>
    </div>
    <br/>
    <div className="profile buttons-ord">
      <button className="profile-button" onClick={() => navigate("/myor")}>My Orders</button>
    </div>
    <br/>
    <div className="profile buttons-log">
      <button className="logginout" onClick={handleLogout}>Logout</button>
    </div>
    </div>
    </div>
    
    
    );
}
export default Profile;