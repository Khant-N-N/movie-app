import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  FaC,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import Movie from "./movie";
import useScrollBar from "../../hooks/useScrollBar";
import { Link } from "react-router-dom";

const MoviePath = ({ topic, ids, fetchData }) => {
  const { movies, loading } = useAxios(fetchData);
  const [movieList, setMovieList] = useState([]);
  const {
    disableLeft,
    disableRight,
    handleScroll,
    handleScrollRight,
    handleScrollLeft,
  } = useScrollBar(ids);

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  return (
    <>
      <p className="text-[1.5rem] mx-4 mb-3 flex justify-between">
        <span>{topic}</span>{" "}
        <Link
          to="/allmovies"
          className="text-[0.8rem] pt-3 text-[var(--main-color)] md:text-[1.2rem]"
        >
          see more
        </Link>
      </p>
      <div className="group relative mb-[1.5rem]">
        <FaCircleChevronLeft
          onClick={handleScrollLeft}
          className={`${
            disableLeft ? "text-[#7d8185]/80" : ""
          } select-none left-2 top-[35%] text-[2rem] absolute cursor-pointer z-10 hidden group-hover:block`}
        />
        <FaCircleChevronRight
          onClick={handleScrollRight}
          className={`${
            disableRight ? "text-[#7d8185]/80" : ""
          } select-none right-2 top-[35%] text-[2rem] absolute cursor-pointer z-10 hidden group-hover:block`}
        />
        {loading ? (
          <p className="w-full flex justify-center">
            <FaC className="animate-spin text-center text-[2rem]" />
          </p>
        ) : (
          <div
            onScroll={handleScroll}
            id={ids}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide mx-3"
          >
            {movieList.map((item) => {
              return <Movie detail={item} key={item.id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MoviePath;
