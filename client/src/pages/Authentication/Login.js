import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/user/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        // Redirect to dashboard or home page after successful login
        // navigate("/dashboard");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        //To store data in local storage to avoid the data loss during page refresh
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        console.log("Logged In!");
        toast.success("User logged in successfully!!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <>
      <Layout title={"Login - E-commerce"}>
        <div className="login-container">
          <div className="login-form">
            <h1>Login</h1>
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
                <label htmlFor="InputPassword">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control1"
                  id="InputPassword"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="forgotBtn"
                onClick={() => {
                  navigate("/forgotpassword");
                }}
              >
                Forgot Password?
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
