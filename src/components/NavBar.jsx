import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scroll, setScroll] = useState(false);
  const [bg, setBg] = useState(true);
  const { user, logOut } = UseAuth();

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log("error in logout", error);
    }
  };
  const hideNavOnScroll = () => {
    let scrollTop = window.scrollY;

    if (scrollTop > 550) {
      setBg(false);
    } else {
      setBg(true);
    }

    if (scrollTop > lastScrollTop) {
      setScroll(true);
    } else {
      setScroll(false);
    }
    setLastScrollTop(scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", hideNavOnScroll);
    return () => window.removeEventListener("scroll", hideNavOnScroll);
  }, [lastScrollTop]);
  return (
    <nav
      id="navBar"
      className={`${scroll ? "top-[-59px]" : "top-0"} ${
        bg
          ? "bg-[transparent] border-none"
          : "bg-[#1e262c]/[0.9] border-b border-black"
      }
       transition-all ease-in fixed z-[99] flex justify-between items-center w-full px-[0.6rem] md:px-[2rem] select-none`}
    >
      <Link to="/">
        <p className="font-alegreya text-[1.6rem] text-[var(--main-color)]">
          WatchWatch
        </p>
      </Link>
      {user?.email ? (
        <>
          <ul className="font-caveat text-[1.3rem] flex items-center gap-2 my-2">
            <Link to="/account">
              <li className="bg-[var(--main-color)] px-[2rem] py-[.3rem] rounded cursor-pointer active:scale-[0.9]">
                Account
              </li>
            </Link>
            <li onClick={handleLogOut}>LogOut</li>
          </ul>
        </>
      ) : (
        <ul className="font-caveat text-[1.3rem] flex items-center gap-2 my-2">
          <Link to="/signIn">
            <li>SignIn</li>
          </Link>
          <Link to="signUp">
            <li className="bg-[var(--main-color)] px-[2rem] py-[.3rem] rounded cursor-pointer active:scale-[0.9]">
              SignUp
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
