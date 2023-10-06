import React, { useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { UseAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Movie = ({ detail }) => {
  const [like, setLike] = useState(false);
  const { user } = UseAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const seriesID = doc(db, "users", `${user?.email}`);

  const saveSeries = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(seriesID, {
        savedSeries: arrayUnion({
          id: detail?.id,
          name: detail?.name,
          img: detail?.poster_path,
          date: detail?.first_air_date,
        }),
      });
    } else {
      alert("Log in to save a show");
    }
  };
  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like);

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
        {like ? (
          <FaHeart className="absolute top-[5px] right-[5px] cursor-pointer" />
        ) : (
          <FaRegHeart
            onClick={detail?.title ? saveMovie : saveSeries}
            className="absolute top-[5px] right-[5px] cursor-pointer"
          />
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
