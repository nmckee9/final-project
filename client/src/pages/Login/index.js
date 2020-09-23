import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import positive from "../../components/images/positive.png";
import "./style.css";
import { useAuth } from "../../context/auth";

function Login({isLoggedIn, setLoggedIn}) {
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { setAuthTokens } = useAuth();

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    console.log("Login username", username);

    //request to server
    axios.post('/login', {
      username,
      password
    }).then(res => {
      if (res.status === 200) {
        setAuthTokens(res.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  else {
    const { setAuthTokens } = useAuth();
  }

  return (
    <div className="container">
      <a className="navbar-item brand-name nav-link center-it" href="/home">
        <img src={positive} className="brand-image " alt="logo" /> happily Woke
          </a>
<br></br>
      <div className="box">
        <header className="modal-card-head ">
          <div class="brand-name">Login<span> to save and view articles!</span></div>
        </header>

        <div className="field">
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input name="username" className="input" type="username" placeholder="Email" value={username} onChange={handleUsernameChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input name="password" className="input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-light" type="submit" onClick={handleSubmit}>
                Login
    </button>
    <Link to="/signup">Don't have an account?</Link>
        
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login