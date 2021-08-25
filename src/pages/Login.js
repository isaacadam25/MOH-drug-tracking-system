import React, { useState } from "react";
import { login, setAuthToken } from "../services/authService";

const initialValues = {
  username: "moh",
  password: "Hospital1234",
};

const Login = (props) => {
  const [values, setValues] = useState(initialValues);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { history } = props;

  const validate = () => {
    if (values.username.length > 20 || !isNaN(values.username)) {
      setUsernameError("Username is not valid");
      return false;
    } else {
      setUsernameError("");
    }
    if (values.password.length > 20) {
      setPasswordError("Password can not exceed 20 characters");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  const handleFormChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { data } = await login(values.username, values.password);
        setAuthToken(data.token);
        window.location = "/moh";
      } catch (ex) {
        console.log(ex.response);
      }
    } else {
      console.log("not submitted");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-12 p-0">
          <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand text-white" href="#">
                <img
                  src="/docs/5.0/assets/brand/bootstrap-logo.svg"
                  alt=""
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                />
                Drug tracking system
              </a>
            </div>
          </nav>
        </div>
        <div className="col-md-6 card mt-5 p-5">
          <form onSubmit={handleFormSubmit}>
            <fieldset>
              <legend>Login here:</legend>
              <div className="row justify-content-center mt-5">
                <div className="col-7">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={values.username}
                      id="username"
                      onChange={handleFormChange}
                      aria-describedby="username"
                      placeholder="Enter your username"
                    />
                    <div className="text-danger">{usernameError}</div>
                  </div>
                </div>
                <div className="col-7">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={values.password}
                      id="password"
                      onChange={handleFormChange}
                      aria-describedby="password"
                      placeholder="Enter your password"
                    />
                    <div className="text-danger">{passwordError}</div>
                  </div>
                </div>
                <div className="col-7">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary float-end"
                  >
                    Login
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
