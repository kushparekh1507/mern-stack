import { useRef } from "react"
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const email = useRef();
  const username = useRef();
  const pwd = useRef();
  const cPwd = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (pwd.current.value !== cPwd.current.value) {
      pwd.current.setCustomValidity("Password and confirm password do not match");
    }
    else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: pwd.current.value
      }
      try {
        navigate("/login");
        await axios.post("auth/register", user);
        console.log("Kush");
      } catch (error) {
        console.log(error);
      }
    }
    e.preventDefault();
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Kushsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Kushsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input type="text" ref={username} required className="loginInput" placeholder="Username" />
            <input type="email" ref={email} required className="loginInput" placeholder="Email" />
            <input type="password" ref={pwd} required className="loginInput" minLength={6} placeholder="Password" />
            <input type="password" ref={cPwd} required className="loginInput" minLength={6} placeholder="Confirm Password" />
            <button className="loginButton" type="submit">Sign Up</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Log in</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
