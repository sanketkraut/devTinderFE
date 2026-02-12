import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (error) {
      setLoginError(error?.response?.data?.error);
      console.log("An Error Occured", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data))
      return navigate("/profile");
    } catch (error) {
      setLoginError(error?.response?.data?.error);
      console.log("An Error Occured", error);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign up"}
          </h2>
          <div>
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                placeholder="Email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{loginError}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-82 border p-4">
            <legend className="fieldset-legend">Register New User ?</legend>
            <label className="label justify-center input-md">
              <input
                type="checkbox"
                className="toggle"
                onChange={(e) => setIsLoginForm(!e.target.checked)}
              />
              Sign up
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
