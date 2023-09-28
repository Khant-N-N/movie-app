import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { FaUser } from "react-icons/fa6";
import AccountPage from "../pages/AccountPage";

const NavBar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scroll, setScroll] = useState(false);
  const [accountDisplay, setAccountDisplay] = useState(false);
  const [bg, setBg] = useState(true);
  const { user } = UseAuth();

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
        <p className="font-alegreya text-[1.3rem] md:text-[1.6rem] text-[var(--main-color)]">
          WatchWatch
        </p>
      </Link>
      <ul className="font-caveat text-[1.2rem] md:text-[1.3rem] flex items-center gap-2 my-2">
        <Link>
          <li className="mr-1 hover:text-[#d79106]/80 active:scale-[0.9]">
            All Movies
          </li>
        </Link>
        {user?.email ? (
          <li className="relative flex justify-end">
            <div
              onClick={() => setAccountDisplay(!accountDisplay)}
              className="bg-[var(--main-color)] cursor-pointer px-[1.5rem] py-[.3rem] rounded hover:bg-[#d79150] active:scale-[0.9]"
            >
              <FaUser className="inline mb-1 mr-1 " />
              <span className="hidden md:inline"> Account</span>
            </div>

            {accountDisplay ? <AccountPage /> : null}
          </li>
        ) : (
          <>
            <Link to="/signIn">
              <li>SignIn</li>
            </Link>
            <Link to="signUp">
              <li className="bg-[var(--main-color)] px-[2rem] py-[.3rem] rounded cursor-pointer active:scale-[0.9]">
                SignUp
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
