import React from "react";
import useFetchSingle from "../hooks/useFetchSingle";
import requests from "../Request";
import { FaC, FaX } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const SeeTrailer = ({ type, watch, setWatch }) => {
  const { id } = useParams();
  const { detail, loading } = useFetchSingle(requests.requestVideos(type, id));
  return (
    <div
      id="trailer"
      className={`${
        watch ? "scale-100" : "scale-0"
      } w-[90%] transition-all md:w-[50%] max-h-[27rem] overflow-scroll z-[9] p-7 rounded absolute bg-black/90 top-[25%] left-[4%] md:left-[10%]`}
    >
      <div className="relative">
        <FaX
          onClick={() => setWatch(false)}
          className="absolute top-[-1rem] right-0"
        />
      </div>
      <h3 className="text-center mb-3">Click Links to see Videos</h3>
      {loading ? (
        <div className="mt-[8rem] mb-[4rem] w-[19rem] md:w-[50rem] sm:w-[30rem] flex justify-center items-center">
          <FaC className="animate-spin text-center text-[2rem]" />
        </div>
      ) : (
        detail?.results?.map((video, id) => (
          <div key={id} className="mb-3">
            <a
              className="flex text-[var(--main-color)] underline"
              target="_blank"
              href={`https://www.youtube.com/embed/${video.key}`}
            >
              <span className="mr-2">{id + 1}.</span>
              <span>
                {" "}
                {video.name} ({video.type})
              </span>
            </a>
          </div>
          // <iframe
          //   key={id + 1}
          //   width="560"
          //   height="315"
          //   src={`https://www.youtube.com/embed/${video.key}`}
          // ></iframe>
        ))
      )}
    </div>
  );
};

export default SeeTrailer;
