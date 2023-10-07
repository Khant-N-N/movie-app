import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Request";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaC, FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import useFetchSingle from "../../hooks/useFetchSingle";
import { UseAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRemoveShow from "../../hooks/useRemoveShow";
import SeeTrailer from "../../components/SeeTrailer";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const { removeMovie, movies } = useRemoveShow();
  const [save, setSave] = useState(false);
  const [watch, setWatch] = useState(false);
  const movieID = doc(db, "users", `${user?.email}`);

  const { detail, loading, runTime } = useFetchSingle(
    requests.request_details(id, "movie")
  );

  useEffect(() => {
    if (movies?.map((show) => show.id).includes(Number(id))) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [movies, id]);

  const toastAlert = () => {
    toast(
      save
        ? "➖ removed (" + detail?.title + ") from favourite"
        : "➕ Saved (" + detail?.title + ") to favourite",
      {
        position: "bottom-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "dark",
      }
    );
  };

  const handleRemove = () => {
    if (!user?.email) return;
    toastAlert();
    removeMovie(detail?.id);
    setSave(false);
  };

  const saveMovie = async () => {
    if (user?.email) {
      toastAlert();
      setSave(true);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: detail?.id,
          title: detail?.title,
          img: detail?.poster_path,
          date: detail?.release_date,
        }),
      });
    } else {
      alert("Log in to save a movie");
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <FaC className="animate-spin text-center text-[2rem]" />
        </div>
      ) : (
        <div className="w-full relative">
          <SeeTrailer type="movie" watch={watch} setWatch={setWatch} />

          <div className="w-full h-[70vh]">
            <div className="w-full h-[70vh] absolute bg-gradient-to-t from-[var(--bg-color)] to-black/50"></div>
            {detail?.backdrop_path && (
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                alt={detail?.title}
                loading="lazy"
              />
            )}
          </div>

          <div className="absolute w-full top-[30%] md:top-[40% ] flex flex-wrap justify-center px-4">
            <div className="w-[250px] h-auto hidden md:block">
              {!detail?.poster_path ? (
                <div className="w-full h-[13rem] text-[grey] flex items-center">
                  couldn't find image
                </div>
              ) : (
                <img
                  className="w-full rounded-lg shadow-[0_0_5px_#111]"
                  src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
                  alt={detail?.title}
                  loading="lazy"
                />
              )}
            </div>
            <div className="md:max-w-[50%] mx-2 md:mx-5">
              <h2 className="text-[2rem] font-bold">{detail?.title}</h2>
              <p className="italic text-[0.8rem] my-2">Run Time : {runTime}</p>
              <p className="italic my-2 flex text-[var(--main-color)]">
                <FaStar className="mr-2 mt-[.1rem]" /> {detail?.vote_average}
              </p>
              <p className="max-h-[7rem] overflow-scroll p-2 rounded hover:border scrollbar-hide opacity-70">
                {detail?.overview}
              </p>
              <div className="my-3 md:hidden">
                {" "}
                Genres:{" "}
                {detail?.genres?.map((ge) => (
                  <span className="italic text-[0.7rem]" key={ge.id}>
                    {ge.name},{" "}
                  </span>
                ))}
              </div>
              <div className="hidden md:flex gap-2 my-2 justify-center flex-wrap md:justify-start">
                {detail?.genres?.map((ge) => (
                  <div
                    className="border px-3 py-1 rounded-xl text-center whitespace-nowrap"
                    key={ge.id}
                  >
                    {ge.name}
                  </div>
                ))}
              </div>
              <p className="italic text-[0.8rem] mb-2 text-center md:text-left">
                release :{" "}
                <span className="text-[var(--main-color)]">
                  {detail?.release_date}
                </span>
              </p>
              <div className="flex ml-4 justify-center md:justify-start">
                {save ? (
                  <div
                    onClick={handleRemove}
                    className="my-2 mr-2 flex justify-center rounded-full border border-[var(--text-color)] px-2 py-2 cursor-pointer drop-shadow-[0px_0px_1px_black] hover:bg-[var(--main-color)] active:scale-[0.9]"
                  >
                    <FaHeart className="text-[1.5rem] text-[var(--main-color)] drop-shadow-[0_0_2px_black]" />
                  </div>
                ) : (
                  <div
                    onClick={saveMovie}
                    className="my-2 mr-2 flex justify-center rounded-full border border-[var(--text-color)] px-2 py-2 cursor-pointer drop-shadow-[0px_0px_1px_black] hover:bg-[var(--main-color)] active:scale-[0.9]"
                  >
                    <FaRegHeart className="text-[1.5rem] drop-shadow-[0_0_2px_black]" />
                  </div>
                )}
                <div
                  onClick={() => {
                    setWatch(true);
                    window.scrollTo(0, 0);
                  }}
                  className="my-2 flex rounded-[25px] border border-[var(--text-color)] px-3 py-2 cursor-pointer drop-shadow-[0px_0px_1px_black] bg-[var(--main-color)] hover:opacity-90 active:scale-[0.9]"
                >
                  <AiOutlinePlayCircle className="text-[1.5rem] mr-2 hover:text-[var(--main-color)] drop-shadow-[0_0_2px_black]" />
                  <span className="text-[1rem]">Watch Trailer</span>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer autoClose={1500} position="bottom-center" />
        </div>
      )}
    </>
  );
};

export default MovieDetails;
