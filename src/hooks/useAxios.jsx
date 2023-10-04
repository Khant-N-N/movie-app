import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setMovies([]);
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log("error in fetch data", error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { movies, loading };
};

export default useAxios;
