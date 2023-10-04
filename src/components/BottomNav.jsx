import React from "react";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { RiMovie2Line } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { UseAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const active =
    "bg-[var(--main-color)] text-black p-3 rounded-full transitions";
  const hover = ({ isActive }) => {
    return isActive ? active : "transitions p-3";
  };

  const handleLink = () => {
    window.scrollTo(0, 0);
  };
  const { user } = UseAuth();
  return (
    <div className="w-full md:hidden bg-black py-3 shadow-[0_0_2px_white] fixed bottom-0 z-[999] flex justify-around">
      <NavLink onClick={handleLink} to="/" title="home" className={hover}>
        <AiOutlineHome className="text-[1.7rem]" />
      </NavLink>
      <NavLink
        onClick={handleLink}
        to="/allmovies"
        title="movies"
        className={hover}
      >
        <RiMovie2Line className="text-[1.7rem]" />
      </NavLink>
      <NavLink
        onClick={handleLink}
        to="/favourite"
        title="favourites"
        className={hover}
      >
        <AiOutlineHeart className="text-[1.7rem]" />
      </NavLink>
      {user ? (
        <NavLink
          onClick={handleLink}
          to="/account"
          title="Account"
          className={hover}
        >
          <IoPersonCircleOutline className="text-[1.7rem]" />
        </NavLink>
      ) : (
        <NavLink
          onClick={handleLink}
          to="/signIn"
          title="Login"
          className={hover}
        >
          <IoPersonCircleOutline className="text-[1.7rem]" />
        </NavLink>
      )}
    </div>
  );
};

export default BottomNav;
