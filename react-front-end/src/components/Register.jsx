import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "./Button";
import axios from "../api/axios";
import "../styles/login.scss";

// const REGISTER_URL = "/register";


export default function Register() {
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [user, setUser] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pwd, setPwd] = useState("");
    const [num, setNum] = useState("");

    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            '/register',
            JSON.stringify({ firstName, lastName, user, pwd, num }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          console.log(JSON.stringify(response?.data));
    
          setUser("");
          setPwd("");
          setSuccess(true);
          if (success) {
            <Navigate to="/vehicles" />;
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
            <h1>REGISTER</h1>
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
                  <label>First Name</label>
                  <br/>
                  <input
                    type="text"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className="form-control"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Last Name</label>
                  <br/>
                  <input
                    type="text"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className="form-control"
                    placeholder="Last Name"
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label>Phone Number</label>
                  <br/>
                  <input
                    type="tel"
                    id="num"
                    onChange={(e) => setNum(e.target.value)}
                    value={num}
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>
              <div className="d-grid">
                <Button>
                  Register
                </Button>
              </div>
            </form>
          </div>
          {success && <Navigate to="/profile" />}
        </div>
      );
};

