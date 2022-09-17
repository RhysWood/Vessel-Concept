import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../styles/login.scss";
import Button from "./Button";
import { useRecoilState } from "recoil";
import profileState from "./atoms";
import axios from "../api/axios";

export default function Login() {
  const [setProfile] = useRecoilState(profileState);

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
    console.log("submitting");
    try {
      const response = await axios.post(
        '/login',
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProfile(response.data);
      console.log(JSON.stringify(response?.data));
      setUser("");
      setPwd("");
      setSuccess(true);
      if (success) {
        
        <Navigate to="/profile" />;
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="parent">
      <div className="child">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="signin">Sign In</h1>
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