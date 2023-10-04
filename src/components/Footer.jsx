import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black w-full">
      <div
        style={{ justifyContent: "space-between" }}
        className="w-[80%] grid grid-cols-2 px-[1rem] md:grid-cols-3 m-auto pt-3"
      >
        <div className="w-[9rem] h-[10rem] flex flex-col">
          <p className="text-[var(--main-color)] text-lg font-bold">Path</p>
          <Link className="hover:text-[var(--main-color)]">Home</Link>
          <Link className="hover:text-[var(--main-color)]">About us</Link>
          <Link className="hover:text-[var(--main-color)]">Contact us</Link>
          <Link className="hover:text-[var(--main-color)]">Movies</Link>
        </div>
        <div className="w-[9rem] h-[10rem] flex flex-col">
          <p className="text-[var(--main-color)] text-lg font-bold">
            Top Categories
          </p>
          <Link className="hover:text-[var(--main-color)]">Action</Link>
          <Link className="hover:text-[var(--main-color)]">Romantic</Link>
          <Link className="hover:text-[var(--main-color)]">Drama</Link>
          <Link className="hover:text-[var(--main-color)]">Horror</Link>
        </div>
        <div className="w-[9rem] h-[10rem] flex flex-col mb-[3rem]">
          <p className="font-alegreya text-[1.3rem] md:text-[1.6rem] text-[var(--main-color)] font-bold">
            WatchWatch
          </p>
          <p>
            Tell:{" "}
            <span className="text-[var(--main-color)]">+959421182623</span>
          </p>
          <p>
            Email:{" "}
            <span className="text-[var(--main-color)]">
              khantnyinyi.magnet@gmail.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
