import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { FaC } from "react-icons/fa6";

const PasswordReset = () => {
  const emailRef = useRef();
  const { resetPassword } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading("true");
      await resetPassword(emailRef.current.value);
      alert("check your email to reset password");
      navigate("/signIn");
    } catch {
      setError("incorrect email");
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
            reset password
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

          <button
            type="submit"
            className="py-2 bg-[var(--main-color)]  h-[2.6rem] lg:w-[60%] w-[80%] rounded-md  active:opacity-80"
          >
            reset password
          </button>
          <p className="my-1">
            <NavLink
              to="/signUp"
              className="text-[var(--main-color)] hover:opacity-80"
            >
              back to LogIn
            </NavLink>
          </p>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;
