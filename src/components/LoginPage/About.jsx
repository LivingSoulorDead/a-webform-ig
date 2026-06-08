import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About(){
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
          navigate("/", { replace: true });
        }
      }, [navigate]);

      return(
        <div className="about-page">
            <h1 className="about-title">About Us</h1>
            <p className="about-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="about-footer">
                <button className="back-btn" onClick={() => navigate("/welcome")}>
                    Back
                </button>
            </div>
        </div>
      )
}

export default About;