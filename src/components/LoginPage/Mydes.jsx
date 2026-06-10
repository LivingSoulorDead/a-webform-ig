import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mydes.css";

function Mydes() {
  const navigate = useNavigate();
    useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
    }, [navigate]);

    return (
    <div className="mydes-container">
        <h2>My Designs</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

    </div>
    );
}

export default Mydes;