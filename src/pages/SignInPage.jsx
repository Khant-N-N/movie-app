import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { FaC } from "react-icons/fa6";

const SignInPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log("error in login", error);
      setError("Incorrect Email or Password");
    }
    setLoading(false);
  };
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      {loading ? (
        <FaC className="animate-spin text-center text-[2rem]" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 rounded shadow-[1px_2px_2px_#111] border border-[var(--main-color)] md:w-[50%] w-[80%] h-[70%] flex-col justify-center items-center"
        >
          <p className="text-[2rem] font-caveat text-center mb-[2rem]">
            Welcome back!
          </p>
          <div className="mb-3 text-[#f04141]">{error && error}</div>
          <input
            type="email"
            ref={emailRef}
            id="signinemail"
            className="w-[80%] lg:w-[60%] text-black h-[3rem] mb-3 rounded-md px-2 py-1 outline-[var(--main-color)]"
            placeholder="Enter Your Email"
            required
          />
          <input
            type="password"
            ref={passwordRef}
            className="w-[80%] lg:w-[60%] text-black  h-[3rem] mb-3 rounded-md px-2 py-1 outline-[var(--main-color)]"
            placeholder="Password"
            required
          />
          <p className="text-left w-[80%] lg:w-[60%] ">
            <input type="checkbox" name="remember" /> Remember Me
          </p>
          <button
            type="submit"
            className="py-2 bg-[var(--main-color)]  h-[2.6rem] lg:w-[60%] w-[80%] rounded-md  active:opacity-80"
          >
            Login
          </button>
          <p className="my-1">
            Havn't Here Before?{" "}
            <NavLink
              to="/signUp"
              className="text-[var(--main-color)] hover:opacity-80"
            >
              Sign Up
            </NavLink>
          </p>
          <p className="text-[var(--main-color)] hover:opacity-80 cursor-pointer">
            <Link to="/resetPassword">Forgetten Password?</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignInPage;
