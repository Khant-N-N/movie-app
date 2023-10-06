import React from "react";
import useFetchSingle from "../hooks/useFetchSingle";
import requests from "../Request";
import {
  FaC,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import useScrollBar from "../hooks/useScrollBar";
import { useParams } from "react-router-dom";

const SeeTrailer = ({ type }) => {
  const { id } = useParams();
  const { detail, loading } = useFetchSingle(requests.requestVideos(type, id));
  const {
    disableLeft,
    disableRight,
    handleScroll,
    handleScrollRight,
    handleScrollLeft,
  } = useScrollBar("video");

  return (
    <div
      id="trailer"
      className="mt-[5rem] mb-[4rem] w-[90%] md:w-[70%] group mx-auto px-4 relative"
    >
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
      <div
        id="video"
        onScroll={handleScroll}
        className="flex overflow-x-scroll gap-x-[2rem] scrollbar-hide scroll-smooth"
      >
        {loading ? (
          <div className="mt-[8rem] mb-[4rem] w-[19rem] md:w-[50rem] sm:w-[30rem] flex justify-center items-center">
            <FaC className="animate-spin text-center text-[2rem]" />
          </div>
        ) : (
          detail?.results?.map((video, id) => (
            <iframe
              key={id + 1}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
            ></iframe>
          ))
        )}
      </div>
    </div>
  );
};

export default SeeTrailer;
