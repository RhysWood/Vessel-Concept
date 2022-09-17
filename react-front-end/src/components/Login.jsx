import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../styles/login.scss";
import Button from "./Button";
// import "bootstrap/dist/css/bootstrap.min.css";

import axios from "../api/axios";
const LOGIN_URL = "/login";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //set focus on input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //if user changes anything, remove err msg
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, {
        user,
        pwd,
      });
      if (res.data.success) {
        setSuccess(true);
      } else {
        setErrMsg(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="parent">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="child">
        <form onSubmit={handleSubmit}>
          <div className="input-section">
            <div className="mb-3">
              <label>Email address</label>
              <br/>
              <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <br/>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <div className="d-grid">
            <Button>
              Login
            </Button>
          </div>
        </form>
      </div>
      {success && <Navigate to="/profile" />}
    </div>
  );
}