import "./designs.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import your images here
import design1 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";
import design2 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";
import design3 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";
import design4 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";
import design5 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";
import design6 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";

const designs = [
  { id: 1, title: "Design 1", image: design1 },
  { id: 2, title: "Design 2", image: design2 },
  { id: 3, title: "Design 3", image: design3 },
  { id: 4, title: "Design 4", image: design4 },
  { id: 5, title: "Design 5", image: design5 },
  { id: 6, title: "Design 6", image: design6 },
];

function Designs() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => navigate("/designs", { replace: true });
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <div className="designs-page">
      <h1 className="designs-title">Design Gallery</h1>

      <div className="designs-grid">
        {designs.map((design) => (
          <div key={design.id} className="design-card">
            <div className="design-img-wrapper">
              <img src={design.image} alt={design.title} className="design-img" />
              <div className="design-overlay">
                <span className="design-name">{design.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="designs-footer">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Designs;