import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { FaMagnifyingGlass, FaUser, FaX } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBox from "./SearchBox";
import Offcanvas from "./Offcanvas";

const NavBar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scroll, setScroll] = useState(false);
  const [searchClick, setSearchClick] = useState(false); //searchbox display on click for under md screen
  const [bg, setBg] = useState(true);
  const [offcanvas, setOffcanvas] = useState(false);
  const { user } = UseAuth();

  const handleLink = () => {
    window.scrollTo(0, 0);
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
          ? "bg-[black]/20 border-none"
          : "bg-[black]/[0.9] border-b border-black"
      }
       transition-all ease-in fixed z-[99] flex justify-between items-center w-full px-[0.6rem] md:px-[2rem] select-none`}
    >
      <Link onClick={handleLink} to="/">
        <p className="font-alegreya text-[1.3rem] md:text-[1.6rem] text-[var(--main-color)] font-bold">
          WatchWatch
        </p>
      </Link>
      <div className="hidden lg:block">
        <SearchBox />
      </div>

      <ul className="relative text-[1.2rem] md:text-[1.3rem] flex items-center gap-2 my-2">
        <NavLink
          onClick={handleLink}
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[var(--main-color)]" : ""
          }
        >
          <li className="mr-1 hidden md:inline hover:text-[#d79106]/80 active:scale-[0.9]">
            Home
          </li>
        </NavLink>
        <NavLink
          onClick={handleLink}
          to="/allmovies"
          className={({ isActive }) =>
            isActive ? "text-[var(--main-color)]" : ""
          }
        >
          <li className="mr-1 hidden md:inline hover:text-[#d79106]/80 active:scale-[0.9]">
            Movies
          </li>
        </NavLink>
        <NavLink
          onClick={handleLink}
          to="/allseries"
          className={({ isActive }) =>
            isActive ? "text-[var(--main-color)]" : ""
          }
        >
          <li className="mr-1 hidden md:inline hover:text-[#d79106]/80 active:scale-[0.9]">
            Series
          </li>
        </NavLink>
        <NavLink
          onClick={handleLink}
          to="/favourite"
          className={({ isActive }) =>
            isActive ? "text-[var(--main-color)]" : ""
          }
        >
          <li className="mr-1 hidden md:inline hover:text-[#d79106]/80 active:scale-[0.9]">
            favourites
          </li>
        </NavLink>
        <div
          onClick={() => setSearchClick(!searchClick)}
          className={`border cursor-pointer relative hover:text-[#d79106]/80 p-3 rounded-full lg:hidden`}
        >
          {searchClick ? (
            <FaX className="text-[0.9rem]" />
          ) : (
            <FaMagnifyingGlass className="text-[0.9rem]" />
          )}
        </div>
        {searchClick && (
          <div className="absolute right-[1rem] bottom-[-3rem] md:right-[9rem] lg:hidden">
            <SearchBox />
          </div>
        )}

        <RxHamburgerMenu
          onClick={() => setOffcanvas(true)}
          className="md:hidden mx-2 cursor-pointer text-[1.5rem] hover:text-[#d79106]/80"
        />

        <Offcanvas setOffcanvas={setOffcanvas} offcanvas={offcanvas} />

        {user?.email ? (
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "text-black md:block hidden" : "md:block hidden"
            }
          >
            <div className="bg-[var(--main-color)] cursor-pointer px-[1.3rem] py-[.3rem] rounded hover:bg-[#d79150] active:scale-[0.9]">
              <FaUser className="inline mb-1 mr-1 " />
              <span className="hidden md:inline"> Account</span>
            </div>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/signIn"
              className={({ isActive }) =>
                isActive ? "text-black md:block hidden" : "md:block hidden"
              }
            >
              <li className="bg-[var(--main-color)] px-[2rem] py-[.3rem] rounded cursor-pointer active:scale-[0.9] hover:bg-[#d79106]/80">
                SignIn
              </li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
