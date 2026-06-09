import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">MyForm</a>
          <p className="footer-tagline">
            Helping learners and creators do their best work — through courses, design tools, and a community that cares.
          </p>
          <div className="footer-social">
            <button className="footer-social-btn" title="Twitter/X">𝕏</button>
            <button className="footer-social-btn" title="Instagram">📸</button>
            <button className="footer-social-btn" title="LinkedIn">💼</button>
            <button className="footer-social-btn" title="YouTube">▶️</button>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/designs">Designs</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/contact">Help Center</a></li>
            <li><a href="/contact">Report a Bug</a></li>
            <li><a href="/contact">Feedback</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@myform.io">hello@myform.io</a></li>
            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
            <li><a href="/contact">Noida, UP – 201301</a></li>
            <li><a href="/contact">Mon–Fri, 10 AM–6 PM</a></li>
          </ul>
        </div>

      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} <span>MyForm</span>. All rights reserved.
        </p>
        <nav className="footer-legal">
          <a href="/about">Privacy Policy</a>
          <a href="/about">Terms of Use</a>
          <a href="/about">Cookie Settings</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;