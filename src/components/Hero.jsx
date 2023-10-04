import React from "react";
import requests from "../Request";
import { FaC } from "react-icons/fa6";
import { AiOutlinePlayCircle } from "react-icons/ai";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";

const Hero = () => {
  const { movies, loading } = useAxios(requests.requestPopular("movie"));

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  return (
    <div className="flex justify-center items-center mb-[1.5rem]">
      {loading ? (
        <p>
          <FaC className="animate-spin text-center text-[2rem]" />
        </p>
      ) : (
        <div className="h-[80vh] w-full relative">
          <div className="w-full h-full">
            <div className="w-full h-[80vh] absolute bg-gradient-to-r from-[var(--bg-color)] to-black/40"></div>

            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`}
              alt={randomMovie.title}
              loading="lazy"
            />
          </div>
          <div className="absolute top-[35%] md:top-[50%] left-[10%]">
            <p className="text-[1.3rem] md:text-[2rem] font-semibold drop-shadow-[0_1px_1px_black]">
              {randomMovie.title}
            </p>

            <p className="text-[var(--main-color)]">
              {randomMovie.release_date}
            </p>
            <p className="px-3 w-[80%] drop-shadow-[0_1px_1px_black]">
              {randomMovie.overview.length >= 100
                ? randomMovie.overview.slice(0, 100) + "..."
                : randomMovie.overview}
            </p>
            <div className="flex ml-4">
              <Link
                to={`/allmovies/${randomMovie.id}`}
                className="my-2 flex border border-[var(--text-color)] rounded-[25px] px-4 py-2 cursor-pointer drop-shadow-[0_0_2px_black] hover:text-[var(--main-color)]"
              >
                <AiOutlinePlayCircle className="text-[2rem] mr-2 cursor-pointer hover:text-[var(--main-color)] drop-shadow-[0_0_2px_black]" />
                <span className="mt-1">Watch Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
