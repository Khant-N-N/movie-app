import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Movie = ({ detail }) => {
  return (
    <div className="mx-2 my-3 shadow w-[9rem]">
      <div className="w-[9rem] relative cursor-pointer">
        {detail?.title ? (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/allmovies/${detail?.id}`}
            className="w-full h-full flex justify-center items-center absolute bg-black/80 opacity-0 hover:opacity-100"
          >
            <AiOutlinePlayCircle className="text-[3rem] text-[var(--main-color)]" />
          </Link>
        ) : (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/allseries/${detail?.id}`}
            className="w-full h-full flex justify-center items-center absolute bg-black/80 opacity-0 hover:opacity-100"
          >
            <AiOutlinePlayCircle className="text-[3rem] text-[var(--main-color)]" />
          </Link>
        )}

        {!detail?.poster_path ? (
          <div className="w-full h-[13rem] border rounded text-[grey] flex justify-center items-center">
            image not found!
          </div>
        ) : (
          <img
            className="w-full h-auto rounded"
            src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
            alt={detail?.title || detail?.name}
            loading="lazy"
          />
        )}
      </div>
      <p className="font-alegreya">{detail?.title || detail?.name}</p>
      <p className="font-alegreya text-[var(--main-color)]">
        {detail?.first_air_date || detail.release_date}
      </p>
    </div>
  );
};

export default Movie;
