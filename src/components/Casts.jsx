import React from "react";
import requests from "../Request";
import { useParams } from "react-router-dom";
import useFetchSingle from "../hooks/useFetchSingle";
import {
  FaC,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import useScrollBar from "../hooks/useScrollBar";

const Casts = ({ type }) => {
  const { id } = useParams();
  const { detail, loading } = useFetchSingle(
    requests.request_credits(id, type)
  );
  const {
    disableLeft,
    disableRight,
    handleScroll,
    handleScrollRight,
    handleScrollLeft,
  } = useScrollBar("castScroll");
  return (
    <>
      {loading ? (
        <div className="mt-[8rem] mb-[4rem] w-[19rem] md:w-[50rem] sm:w-[30rem] flex justify-center items-center">
          <FaC className="animate-spin text-center text-[2rem]" />
        </div>
      ) : (
        <div className="mt-[8rem] mb-[4rem] w-[90%] md:w-[70%] group mx-auto px-4 relative">
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
          <h3 className="mb-2">Casts: </h3>
          <div
            id="castScroll"
            onScroll={handleScroll}
            className="w-full flex overflow-scroll scroll-smooth gap-x-[1rem] scrollbar-hide"
          >
            {detail?.cast?.length === 0
              ? "No casts data found"
              : detail?.cast?.map((cast, id) => {
                  return (
                    <div key={id} className="w-[7rem]">
                      <div className="w-[7rem]">
                        {!cast.profile_path ? (
                          <div className="w-full h-[168px] border rounded-lg justify-center text-[grey] flex items-center">
                            Not Found
                          </div>
                        ) : (
                          <img
                            className="w-full h-auto rounded-lg shadow-[0_0_5px_#111]"
                            src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                            alt={cast.character}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p className="text-[0.8rem]">{cast.name}</p>
                      <p className="text-[0.7rem] text-[var(--main-color)]">
                        {cast.character}
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default Casts;
