import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import {
  FaC,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import Movie from "./movie";

const MoviePath = ({ topic, ids, fetchData }) => {
  const { movies, loading } = useAxios(fetchData);
  const [movieList, setMovieList] = useState([]);
  const [disableLeft, setDisableLeft] = useState(true);
  const [disableRight, setDisableRight] = useState(false);

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  const handleScrollRight = () => {
    document.getElementById(ids).scrollLeft += 300;
  };
  const handleScrollLeft = () => {
    document.getElementById(ids).scrollLeft -= 300;
  };

  const handleScroll = () => {
    const containerWidth = document.getElementById(ids).offsetWidth;
    const scrollPosition = document.getElementById(ids).scrollLeft;
    const scrollWidth = document.getElementById(ids).scrollWidth;

    if (scrollPosition === 0) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }

    if (scrollPosition + containerWidth >= scrollWidth - 10) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }
  };

  return (
    <>
      <p className="text-[1.5rem] mx-2 mb-3">{topic}</p>
      <div className="group relative">
        <FaCircleChevronLeft
          onClick={handleScrollLeft}
          className={`${
            disableLeft ? "text-[#7d8185]/80" : ""
          } left-2 top-[35%] text-[2rem] absolute cursor-pointer z-10 hidden group-hover:block`}
        />
        <FaCircleChevronRight
          onClick={handleScrollRight}
          className={`${
            disableRight ? "text-[#7d8185]/80" : ""
          } right-2 top-[35%] text-[2rem] absolute cursor-pointer z-10 hidden group-hover:block`}
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
