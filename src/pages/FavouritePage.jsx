import React, { useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaX } from "react-icons/fa6";
import useRemoveShow from "../hooks/useRemoveShow";

const FavouritePage = () => {
  const { movies, series, removeMovie, removeShow } = useRemoveShow();
  const [selectSeries, setSelectSeries] = useState(false);
  const { user } = UseAuth();
  const handleClick = () => {
    setSelectSeries(!selectSeries);
  };

  return (
    <div className="mb-7">
      <div className="w-full h-[20vh] relative">
        <div className="w-full h-full absolute bg-black/50"></div>

        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/51fe4262-0740-4943-9021-3cd755ac2bed/MM-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <p className="text-center font-caveat text-[var(--main-color)] text-[1.6rem] my-5">
        My Saved Shows
      </p>
      <div className="flex justify-center mb-4">
        <p
          onClick={handleClick}
          className={`border py-2 px-4 cursor-pointer transition-all ${
            selectSeries ? "" : "bg-[var(--main-color)]"
          }`}
        >
          Movies
        </p>
        <p
          onClick={handleClick}
          className={`border py-2 px-4 cursor-pointer transition-all ${
            selectSeries ? "bg-[var(--main-color)]" : ""
          }`}
        >
          Series
        </p>
      </div>
      {user ? (
        <div className="flex flex-wrap mx-5 justify-center">
          {selectSeries
            ? series?.length === 0 && (
                <div className="w-full h-[20rem] justify-center flex-col flex items-center text-[1.2rem] text-center animate-pulse">
                  No saved Sereis
                </div>
              )
            : movies?.length === 0 && (
                <div className="w-full h-[20rem] justify-center flex-col flex items-center text-[1.2rem] text-center animate-pulse">
                  No saved Movies
                </div>
              )}
          {movies || series ? (
            !selectSeries ? (
              movies?.map((movie, id) => {
                return (
                  <div key={id} className="mx-2 my-3 shadow w-[9rem]">
                    <div className="w-[9rem] relative cursor-pointer">
                      <Link
                        to={`/allmovies/${movie.id}`}
                        className="w-full h-full flex justify-center items-center absolute bg-black/80 opacity-0 hover:opacity-100"
                      >
                        <AiOutlinePlayCircle className="text-[3rem] text-[var(--main-color)]" />
                      </Link>

                      <img
                        className="w-full h-auto rounded"
                        src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                        alt={movie?.title}
                      />
                      <FaX
                        onClick={() => removeMovie(movie.id)}
                        className="absolute bg-black/80 rounded-full top-[5px] right-[5px] cursor-pointer"
                      />
                    </div>
                    <p className="font-alegreya">{movie?.title}</p>
                    <p className="font-alegreya text-[var(--main-color)]">
                      {movie?.date}
                    </p>
                  </div>
                );
              })
            ) : (
              series?.map((series, id) => {
                return (
                  <div key={id} className="mx-2 my-3 shadow w-[9rem]">
                    <div className="w-[9rem] relative cursor-pointer">
                      <Link
                        to={`/allseries/${series.id}`}
                        className="w-full h-full flex justify-center items-center absolute bg-black/80 opacity-0 hover:opacity-100"
                      >
                        <AiOutlinePlayCircle className="text-[3rem] text-[var(--main-color)]" />
                      </Link>

                      <img
                        className="w-full h-auto rounded"
                        src={`https://image.tmdb.org/t/p/w500/${series?.img}`}
                        alt={series?.name}
                      />
                      <FaX
                        onClick={() => removeShow(series.id)}
                        className="absolute bg-black/80 rounded-full top-[5px] right-[5px] cursor-pointer"
                      />
                    </div>
                    <p className="font-alegreya">{series?.name}</p>
                    <p className="font-alegreya text-[var(--main-color)]">
                      {series?.date}
                    </p>
                  </div>
                );
              })
            )
          ) : (
            <div className="w-full h-[20rem] justify-center flex-col flex items-center text-[1.2rem] text-center animate-pulse">
              You havn't save any show
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[20rem] justify-center flex-col flex items-center text-[1.5rem] text-center">
          Please SignIn to see saved movies{" "}
          <Link
            to="/signIn"
            className="text-[var(--main-color)] animate-bounce my-4"
          >
            SignIn here
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
