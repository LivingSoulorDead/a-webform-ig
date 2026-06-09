import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact(){
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
          navigate("/loginn", { replace: true });
        }
      }, [navigate]);

        return(
            <div className="contact-page">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-content">
                    For any inquiries, please contact us at:
                    <br />
                    Email: Loremipsum@gmail.com
                    <br />
                    Phone: +123 456 7890
                    <br /> 
                    Address: 123 Main Street, Anytown, USA
                </p>
                <div className="contact-footer">
                    <button className="back-btn" onClick={() => navigate("/")}>
                        Back
                    </button>
                </div>
            </div>
        )
}

export default Contact;