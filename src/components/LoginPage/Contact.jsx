import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject) newErrors.subject = "Please select a topic.";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
    const entry = {
      ...form,
      submittedAt: new Date().toISOString(),
      submittedBy: localStorage.getItem("username") || "Unknown",
    };
    existing.push(entry);
    localStorage.setItem("contactSubmissions", JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <h1>Let's talk.</h1>
        <p className="contact-hero-sub">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      {/* Main: info + form */}
      <div className="contact-main">

        {/* Left: contact info */}
        <div className="contact-info">
          <div className="contact-info-header">
            <h2>Reach us directly.</h2>
            <p>Prefer a direct line? Here's where to find us.</p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">✉️</div>
            <div className="contact-card-body">
              <h4>Email</h4>
              <p>LoremIpsum@gmail.com</p>
              <span>For general inquiries &amp; support</span>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">📞</div>
            <div className="contact-card-body">
              <h4>Phone</h4>
              <p>+91 987XXXXXxXXX</p>
              <span>Mon – Fri, 10 AM – 6 PM IST</span>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">📍</div>
            <div className="contact-card-body">
              <h4>Office</h4>
              <p>Lorem Ipsum</p>
              <span>Lorem, Ipsum – 111111</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h3 style={{ marginBottom: "10px" }}>Message sent!</h3>
              <p style={{ color: "#7c6e74", fontSize: "15px" }}>
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h3>Send us a message.</h3>
              <p>Fill in all fields and we'll be in touch shortly.</p>

              <div className="form-row">
                <div className="form-field">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "input-error" : ""}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="form-field">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "input-error" : ""}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="username@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label>Subject *</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={errors.subject ? "input-error" : ""}
                >
                  <option value="">Select a topic...</option>
                  <option value="courses">Option 1</option>
                  <option value="designs">Option 2</option>
                  <option value="support">Option 3</option>
                  <option value="billing">Option 4</option>
                </select>
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>

              <div className="form-field">
                <label>Message *</label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "input-error" : ""}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button className="submit-btn" onClick={handleSubmit}>
                Send Message →
              </button>
              <span className="form-note">We typically respond within one business day.</span>
            </>
          )}
        </div>
      </div>

      {/* Hours + FAQ */}
      <div className="contact-extra">
        <div className="contact-extra-inner">
          <div className="contact-hours">
            <h3>Business hours.</h3>
            <div className="hours-list">
              {[
                { day: "Monday – Friday", time: "10:00 AM – 6:00 PM IST" },
                { day: "Saturday", time: "11:00 AM – 3:00 PM IST" },
                { day: "Sunday", closed: true },
              ].map((h, i) => (
                <div className="hours-row" key={i}>
                  <span className="hours-day">{h.day}</span>
                  {h.closed
                    ? <span className="hours-closed">Closed</span>
                    : <span className="hours-time">{h.time}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="contact-faq">
            <h3>Common questions.</h3>
            <div className="faq-list">
              {[
                { q: "Lorem Ipsum", a: "Lorem Lorem" },
                { q: "Lorem Ipsum Ipsum?", a: "Loreeeeem" },
                { q: "Lorem! Ipsum?", a: "Ipsum" },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contact;