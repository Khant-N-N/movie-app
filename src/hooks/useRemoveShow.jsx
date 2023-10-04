import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { UseAuth } from "../contexts/AuthContext";

const useRemoveShow = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const { user } = UseAuth();

  const showRef = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    onSnapshot(showRef, (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
    onSnapshot(showRef, (doc) => {
      setSeries(doc.data()?.savedSeries);
    });
  }, [user?.email]);

  const removeMovie = async (id) => {
    try {
      const result = movies.filter((movie) => movie.id !== id);
      await updateDoc(showRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log("error removing show", error);
    }
  };
  const removeShow = async (id) => {
    try {
      const result = series.filter((series) => series.id !== id);
      await updateDoc(showRef, {
        savedSeries: result,
      });
    } catch (error) {
      console.log("error removing show", error);
    }
  };
  return { removeMovie, removeShow, movies, series };
};

export default useRemoveShow;
