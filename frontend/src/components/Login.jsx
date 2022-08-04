import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";

import "./login.css"

const Register = ({ setShowLogin, setCurrentUser, myLocalStorage }) => {
  const [validCredentials, setValidCredentials] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      setCurrentUser(res.data.username);
      myLocalStorage.setItem('username', res.data.username);
      setShowLogin(false)
      setValidCredentials(true);
    } catch (err) {
      setValidCredentials(false);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Travel Pin</span>
      </div>
      <form onSubmit={handleSubmit} className="registerForm">
        <input autoFocus placeholder="username" ref={usernameRef} required />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
          required
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => { setShowLogin(false) }}
      />
      {!validCredentials &&
      <p className="loginError">Invalid Credentials Or please register again.</p>
      }
    </div>
  );
}

export default Register