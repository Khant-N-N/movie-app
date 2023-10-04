import React from "react";
import requests from "../Request";
import { useParams } from "react-router-dom";
import useFetchSingle from "../hooks/useFetchSingle";
import {
  FaC,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import Movie from "./for movies/movie";
import useScrollBar from "../hooks/useScrollBar";

const Recommendation = ({ type }) => {
  const { id } = useParams();
  const { detail, loading } = useFetchSingle(
    requests.requestRecommendation(id, type)
  );

  const {
    disableLeft,
    disableRight,
    handleScroll,
    handleScrollRight,
    handleScrollLeft,
  } = useScrollBar("recommendation");

  return (
    <div className="mt-[2rem] mb-[4rem] w-[90%] md:w-[70%] group mx-auto px-4 relative">
      <FaCircleChevronLeft
        onClick={handleScrollLeft}
        className={`${
          disableLeft ? "text-[#7d8185]/80" : ""
        } select-none left-2 top-[45%] text-[2rem] absolute cursor-pointer z-10 hidden group-hover:block`}
      />
      <FaCircleChevronRight
        onClick={handleScrollRight}
        className={`${
          disableRight ? "text-[#7d8185]/80" : ""
        } select-none right-2 top-[45%] text-[2rem] absolute cursor-pointer z-10 hidden group-hover:block`}
      />
      <h3>Recommedations: </h3>
      {loading ? (
        <div className="mt-[8rem] mb-[4rem] w-[19rem] md:w-[50rem] sm:w-[30rem] flex justify-center items-center">
          <FaC className="animate-spin text-center text-[2rem]" />
        </div>
      ) : (
        <div
          onScroll={handleScroll}
          id="recommendation"
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide mx-3"
        >
          {detail?.results?.length === 0 ? (
            <span className="opacity-80">No recommendation found</span>
          ) : (
            detail?.results?.map((item) => {
              return <Movie detail={item} key={item.id} />;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
