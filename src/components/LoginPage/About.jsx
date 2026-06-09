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
    { icon: "🎯", title: "Purpose-Driven", desc: "Every decision we make is guided by a clear intention — to create work that matters and stands the test of time." },
    { icon: "🤝", title: "Built on Trust", desc: "We believe great relationships are the foundation of great work. Transparency and honesty are non-negotiable." },
    { icon: "✨", title: "Quality First", desc: "We'd rather do fewer things exceptionally well than many things adequately. Craft and attention to detail define us." },
    { icon: "🌱", title: "Always Learning", desc: "Curiosity drives us. We invest in growth — our team's, our clients', and our own understanding of the world." },
    { icon: "🚀", title: "Bold Ideas", desc: "Safe is boring. We push boundaries thoughtfully, take calculated risks, and champion ideas worth backing." },
    { icon: "💡", title: "Human-Centered", desc: "Technology should serve people, not the other way around. We design and build with empathy at the core." },
  ];

  const team = [
    { initials: "AK", name: "Archit Kumar", role: "Founder & CEO", bio: "Visionary behind the platform, passionate about education and design." },
    { initials: "SR", name: "Sneha Rao", role: "Head of Design", bio: "Craft-obsessed designer with a decade of product experience." },
    { initials: "MT", name: "Mihir Tiwari", role: "Lead Engineer", bio: "Full-stack engineer who loves clean systems and elegant code." },
    { initials: "PA", name: "Priya Arora", role: "Growth & Marketing", bio: "Storyteller and strategist who turns ideas into reach." },
  ];

  const timeline = [
    { year: "2020", title: "The Idea", desc: "Founded in a small room with one laptop and a big question: what if learning was actually beautiful?" },
    { year: "2021", title: "First 100 Users", desc: "Launched our beta to a small cohort of early believers. The feedback shaped everything that followed." },
    { year: "2022", title: "Product Expansion", desc: "Grew our course library, introduced design tools, and hit 10,000 active users across 30+ countries." },
    { year: "2024", title: "Where We Are Today", desc: "A trusted platform used by thousands of learners and creators, still led by the same obsession with quality." },
  ];

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <span className="about-hero-label">Our Story</span>
        <h1>We're building something<br />worth your time.</h1>
        <p className="about-hero-sub">
          A small team on a big mission — to make learning and design accessible, beautiful, and genuinely useful for everyone.
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
          We started MyForm because we believed that great learning experiences and beautiful design shouldn't be reserved for the privileged few. Whether you're a student picking up a new skill, a creative building your portfolio, or a professional leveling up — we're here to give you the tools, the knowledge, and the inspiration to do your best work.
        </p>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-inner">
          <div className="about-values-header">
            <span className="section-eyebrow">What Drives Us</span>
            <h2>Our values aren't a poster on the wall.</h2>
            <p>They're the decisions we make every day — in code, in design, and in how we treat people.</p>
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

      {/* Team */}
      <section className="about-team">
        <div className="about-team-header">
          <span className="section-eyebrow">The Team</span>
          <h2>People who care about the work.</h2>
          <p>A small, focused team that brings curiosity and craftsmanship to everything we build.</p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">{member.initials}</div>
              <h4>{member.name}</h4>
              <span className="team-role">{member.role}</span>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story-inner">
          <h2>How we got here.</h2>
          <div className="story-timeline">
            {timeline.map((item, i) => (
              <div className="story-item" key={i}>
                <div className="story-dot"></div>
                <span className="story-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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