import "./designs.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import design1 from "../../assets/360_F_406607245_daS9yMQ9g8MMZz3XWf2LVXxFy5cAdLQ7.jpg";
import design2 from "../../assets/119530-pink-abstract-background-design.jpg";
import design3 from "../../assets/abstract-organic-pattern-design-background_1048-19286.avif";
import design4 from "../../assets/pngtree-blue-and-yellow-abstract-background-design-great-for-creative-dynamic-projects-image_16870269.jpg";
import design5 from "../../assets/pngtree-soft-pastel-floral-design-light-blue-background-picture-image_16257054.jpg";
import design6 from "../../assets/images.jpg";

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
  const gridRef = useRef(null);

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

  useEffect(() => {
    function calcRowHeight() {
      if (!gridRef.current) return;

      // Get the header element height
      const header = document.querySelector("header") || document.querySelector("nav");
      const headerH = header ? header.offsetHeight : 60;

      // Total viewport minus header
      const availableTotal = window.innerHeight - headerH;

      // Subtract page padding top+bottom (24+20=44), title height (~52), title margin-bottom (20),
      // footer height (~46), footer padding-top (16), gap between rows (14)
      const rowH = Math.floor((availableTotal - 44 - 52 - 20 - 46 - 16 - 14) / 2);

      gridRef.current.style.gridTemplateRows = `${rowH}px ${rowH}px`;
    }

    // Run after paint so layout is complete
    const raf = requestAnimationFrame(() => {
      calcRowHeight();
    });

    window.addEventListener("resize", calcRowHeight);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", calcRowHeight);
    };
  }, []);

  return (
    <div className="designs-page">
      <h1 className="designs-title">Design Gallery</h1>

      <div className="designs-grid" ref={gridRef}>
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