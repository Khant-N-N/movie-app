import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import requests from "../../Request";
import { FaC } from "react-icons/fa6";

import Movie from "../../components/for movies/movie";

const AllSeries = () => {
  const [page, setPage] = useState(1);
  const { movies, loading } = useAxios(requests.requestDiscover("tv", page));
  const [allSeries, setAllSeries] = useState([]);

  useEffect(() => {
    setAllSeries([...allSeries, ...movies]);
  }, [movies]);
  const handleLoad = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className="mb-3">
      <div className="w-full h-[10vh] relative">
        <div className="w-full h-full absolute bg-black/50"></div>

        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/51fe4262-0740-4943-9021-3cd755ac2bed/MM-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <h3 className="text-[1.5rem] px-3">Browse All TV shows:</h3>
      <div className="flex flex-wrap justify-center mt-4">
        {loading ? (
          <div className="w-full h-[70vh] flex justify-center items-center">
            <FaC className="animate-spin text-center text-[2rem]" />
          </div>
        ) : (
          allSeries?.map((item, id) => {
            return <Movie detail={item} key={id} />;
          })
        )}
      </div>
      <div className="flex justify-center">
        <div
          onClick={handleLoad}
          className="border rounded cursor-pointer px-4 py-2 active:scale-[0.9] hover:text-[var(--main-color)]"
        >
          Load more
        </div>
      </div>
    </div>
  );
};

export default AllSeries;
