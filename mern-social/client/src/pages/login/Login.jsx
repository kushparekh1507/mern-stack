import { useContext, useRef } from "react";
import "./login.css"
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core"

const Login = () => {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    e.preventDefault();
  }

  console.log(user);

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
            <input type="email" className="loginInput" placeholder="Email" ref={email} required />
            <input type="password" className="loginInput" placeholder="Password" ref={password} required minLength={6} />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color="secondary" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            {/* <Link to="/register"> */}
              <button className="loginRegisterButton">Create new Account</button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
