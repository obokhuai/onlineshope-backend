import React, { useState, useEffect, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../slices/users-api-slice";
import { toast } from "react-toastify";
import "./login-screen.css";
import { setCredentials } from "../../../slices/auth-slice";
import FormContainer from "../../form-container/form-container";
import Loader from "../../spinner/spinner";
import { RootState } from "../../../store";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  console.log("location",location)
  const sp = new URLSearchParams(location.search);
  console.log("sp",sp)
  const redirect = sp.get("redirect") || "/";
  console.log("redirect",redirect)

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err: any) {
      toast.error(err?.data?.message || err.error || "Login failed");
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <form className="custom-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="submit-btn" disabled={isLoading} type="submit">
          Sign In
        </button>

        {isLoading && <Loader />}
      </form>

      <div className="register-row">
        New Customer?{" "}
        <Link to={redirect?`/register?redirect=${redirect}` : "/register"}>
          Register
        </Link> 
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
