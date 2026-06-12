import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
  }, [navigate]);

  const values = [
    { icon: "🎯", title: "Purpose-Driven", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { icon: "🤝", title: "Built on Trust", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { icon: "✨", title: "Quality First", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { icon: "🌱", title: "Always Learning", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { icon: "🚀", title: "Bold Ideas", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { icon: "💡", title: "Human-Centered", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  ];

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <span className="about-hero-label">Our Story</span>
        <h1>We're building something<br />worth your time.</h1>
        <p className="about-hero-sub">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      {/* Stats */}
      <div className="about-stats">
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Active Learners</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">Courses & Programs</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">30+</div>
          <div className="stat-label">Countries Reached</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.9★</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      {/* Mission */}
      <section className="about-mission">
        <span className="section-eyebrow">Our Mission</span>
        <h2>Education and design, done right.</h2>
        <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.        </p>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-inner">
          <div className="about-values-header">
            <span className="section-eyebrow">What Drives Us</span>
            <h2>Lorem Ipsum.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="projs">
        <button>Check Out Our Projects</button>
        
      </section>
      <section className="about-cta">
        <h2>Want to be part of the story?</h2>
        <p>Explore our courses, check out our work, or just say hello.</p>
        <div className="cta-buttons">
          <button className="cta-primary" onClick={() => navigate("/courses")}>
            Browse Courses
          </button>
          <button className="cta-secondary" onClick={() => navigate("/contact")}>
            Get in Touch
          </button>
        </div>
      </section>

    </div>
  );
}

export default About;