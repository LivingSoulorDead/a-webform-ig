import "./index22.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vector from "../../assets/Vector.png";
import VectorPassword from "../../assets/Vector (1).png";
import Line from "../../assets/Line 1.png";
import Google from "../../assets/google 1.png";
import Facebook from "../../assets/facebook 1.png";
import Group12 from "../../assets/Group 12.png";
import Group11 from "../../assets/Group 11.png";
import Rectangle5 from "../../assets/Rectangle 5.png";
import WomenWithTab from "../../assets/women with tab 1.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const validUsername = "Archit";
  const validPassword = "Archit";

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/welcome", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    setUsernameError("");
    setPasswordError("");

    const trimmedUsername = username.trim();
    let isValid = true;

    if (!trimmedUsername) {
      setUsernameError("Please enter a username");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (trimmedUsername !== validUsername) {
      setUsernameError("Incorrect username entered");
      isValid = false;
    }

    if (password !== validPassword) {
      setPasswordError("Incorrect password entered");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    localStorage.setItem("username", trimmedUsername);
    navigate("/welcome", { replace: true, state: { username: trimmedUsername } });
  };

  return (
    <div className="container">
      <div className="left">
        <div className="login">
          <p>LOGIN</p>
        </div>
        <div className="more">
          <p><b>How to i get started lorem ipsum dolor at?</b></p>
        </div>
        <div className="inp">
          <div className="first">
            <img src={Vector} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              onBlur={() => {
                const trimmedUsername = username.trim();
                if (!trimmedUsername) {
                  setUsernameError("Please enter a username");
                } else if (trimmedUsername !== validUsername) {
                  setUsernameError("Incorrect username entered");
                } else {
                  setUsernameError("");
                }
              }}
              className={usernameError ? "error-input" : ""}
            />
          </div>
          <div className="second">
            <img src={VectorPassword} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onBlur={() => {
                if (!password) {
                  setPasswordError("Please enter a password");
                } else if (password !== validPassword) {
                  setPasswordError("Incorrect password entered");
                } else {
                  setPasswordError("");
                }
              }}
              className={passwordError ? "error-input" : ""}
            />
            <div className="error-message">
              {usernameError || passwordError}
            </div>
          </div>
        </div>
        <div className="enter">
          <button onClick={handleLogin}>Login Now</button>
        </div>
        <div className="line">
          <img src={Line} />
        </div>
        <div className="line2">
          <img src={Line} />
        </div>
        <div className="with">
          <p><b>Login </b>with Others</p>
        </div>
        <div className="final">
          <div className="google">
            <button><img src={Google} />Login with<b>google</b></button>
          </div>
          <div className="fb">
            <button><img src={Facebook} />Login with <b>Facebook</b></button>
          </div>
        </div>
      </div>

      <div className="divider"></div>
      <div className="divider2"></div>

      <div className="right">
        <div className="imge1">
          <img src={Group12}></img>
        </div>
        <div className="imge2">
          <img src={Group11}></img>
        </div>
        <div className="imge3">
          <img src={Rectangle5}></img>
        </div>
        <div className="imge4">
          <img src={WomenWithTab}></img>
        </div>
        <div className="texth">
          <p><b>Very good</b></p>
          <br></br>
          <p><b>works are</b></p>
          <br></br>
          <p><b>waiting for</b></p>
          <br></br>
          <p><b>you Login</b></p>
          <br></br>
          <p><b>Now!!!</b></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;