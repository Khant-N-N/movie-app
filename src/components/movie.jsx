import React, { useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { UseAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ detail }) => {
  const { title, id, release_date, poster_path } = detail;
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const { user } = UseAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like);
      setSave(true);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: id,
          title: title,
          img: poster_path,
        }),
      });
    } else {
      alert("Log in to save a movie");
    }
  };

  return (
    <div key={id} className="mx-2 my-3 shadow">
      <div className="w-[9rem] relative cursor-pointer">
        <div
          onClick={saveMovie}
          className="w-full h-full flex justify-center items-center absolute bg-black/80 opacity-0 hover:opacity-100"
        >
          {like ? (
            <FaHeart className="absolute top-[5px] right-[5px]" />
          ) : (
            <FaRegHeart className="absolute top-[5px] right-[5px]" />
          )}
          <AiOutlinePlayCircle className="text-[3rem] text-[var(--main-color)]" />
        </div>
        <img
          className="w-full h-auto rounded"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      </div>
      <p className="font-alegreya">{title}</p>
      <p className="font-alegreya text-[var(--main-color)]">{release_date}</p>
    </div>
  );
};

export default Movie;
