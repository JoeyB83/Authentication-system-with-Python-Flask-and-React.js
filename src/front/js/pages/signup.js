import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();

  console.log(userActive);

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={(e) => setUserActive(e.target.checked)}
            value={userActive}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Active
          </label>
        </div>
        <button type="submit" className="btn btn-primary" 
          onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}>
          Submit
        </button>
      </form>
    </div>
  );
};