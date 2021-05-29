import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { useHistory } from "react-router";

export default function LoginForm({ successLogin }) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);
  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const clickLoginButtonHandler = async () => {
    const userName = state.userName;
    const password = state.password;
    const inputBody = { userName: userName, password: password };
    var url = "http://localhost:5555/auth-service/auth/login";
    let response = await axios.post(url, inputBody);

    if (response.data.member !== null && Object.keys(response.data).length) {
      successLogin(response.data.member);
      history.push("/home");
    } else {
      setErrorMessage(true);
    }
  };
  const registerHandler = () => {
    history.push("/member/add");
  };
  return (
    <div className="login-page">
      <div className="login-container bg-light mt-5">
        <h2 className="text-center">Please login</h2>
        <div>
          {errorMessage && (
            <div className="btn-light">Invalid Username or password</div>
          )}
          <div className="row">
            <div className="col-6">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                id="dateOfDischarge"
                name="dateOfDischarge"
                value={state.userName}
                onChange={(e) => {
                  setState({ ...state, userName: e.target.value });
                }}
              />
            </div>
            <div className="col-6 ">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="totalBill"
                value={state.password}
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary button-raise"
                onClick={clickLoginButtonHandler}
              >
                Login
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-secondary button-raise"
                onClick={registerHandler}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
