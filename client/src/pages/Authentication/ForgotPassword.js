import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";

import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/forgotpassword`,
        {
          email,
          newpassword,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/login");
        console.log("Password Reset!");
        toast.success("Password reset successfully!!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <Layout title={"Forgot-Password - E-commerce"}>
      <div className="login-container">
        <div className="login-form">
          <h1>Reset password</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="InputEmail">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control1"
                id="InputEmail"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputNewPassword">New Password</label>
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control1"
                id="InputNewPassword"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputAnswer">Secret Answer</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control1"
                id="InputAnswer"
                placeholder="Enter your first school name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Password
            </button>
            {/* <button
              type="button"
              className="btn btn-primary"
              id="forgotBtn"
              onClick={() => {
                navigate("/forgotpassword");
              }}
            >
              Forgot Password?
            </button> */}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
