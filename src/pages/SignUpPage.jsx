import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { FaC } from "react-icons/fa6";

const SignUpPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, user } = UseAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("Password does not match");
    }
    if (passwordConfirmRef.current.value.length < 6) {
      return setError("Password Length should be atleast 6");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
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
          <p className="text-[2rem] font-caveat mb-[2rem] text-center px-2">
            Create an Account for more features
          </p>
          {error && <div className="mb-3 text-[#f04141]">{error}</div>}
          <input
            type="email"
            className="w-[80%] text-black lg:w-[60%] h-[3rem] mb-3 rounded-md px-2 py-1 outline-[var(--main-color)]"
            placeholder="Enter Your Email"
            autoComplete="current-email"
            ref={emailRef}
            required
          />
          <input
            type="password"
            className="w-[80%] text-black  lg:w-[60%] h-[3rem] mb-3 rounded-md px-2 py-1 outline-[var(--main-color)]"
            placeholder="Enter password"
            ref={passwordRef}
            required
          />
          <input
            type="password"
            className="w-[80%] text-black lg:w-[60%] h-[3rem] mb-3 rounded-md px-2 py-1 outline-[var(--main-color)]"
            placeholder="Confirm your password"
            ref={passwordConfirmRef}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="py-2 bg-[var(--main-color)] h-[2.6rem] lg:w-[60%] w-[80%] rounded-md  active:opacity-80"
          >
            SignUp
          </button>
          <p className="my-1">
            Already have an account?{" "}
            <NavLink
              to="/signIn"
              className="text-[var(--main-color)] hover:opacity-80"
            >
              Sign in
            </NavLink>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
