import React from "react";
import { FaX } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Offcanvas = ({ setOffcanvas, offcanvas }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
    setOffcanvas(false);
  };
  return (
    <div
      className={`${
        offcanvas ? "right-0" : "right-[-300px]"
      } md:hidden h-[100vh] w-[300px] bg-[black]/90 absolute top-0 right-0 flex flex-col items-center transition-all duration-300 z-[9999]`}
    >
      <FaX
        onClick={handleClick}
        className="cursor-pointer text-[1rem] hover:text-[#d79106]/80 absolute right-3 top-4"
      />
      <NavLink
        onClick={handleClick}
        to="/"
        className="mt-[6rem] hover:text-[#d79106]/80"
      >
        Home
      </NavLink>
      <NavLink
        onClick={handleClick}
        to="/allmovies"
        className="mt-5 hover:text-[#d79106]/80"
      >
        Movies
      </NavLink>
      <NavLink
        onClick={handleClick}
        to="/allseries"
        className="mt-5 hover:text-[#d79106]/80"
      >
        Series
      </NavLink>
      <NavLink
        onClick={handleClick}
        to="/contactus"
        className="mt-5 hover:text-[#d79106]/80"
      >
        Contact Us
      </NavLink>
    </div>
  );
};

export default Offcanvas;
