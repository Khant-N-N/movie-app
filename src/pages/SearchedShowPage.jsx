import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSingle from "../hooks/useFetchSingle";
import requests from "../Request";
import { FaC } from "react-icons/fa6";
import Movie from "../components/for movies/movie";

const SearchedShowPage = () => {
  const { keyword, num } = useParams();
  const [page, setPage] = useState(Number(num));
  const [allShows, setAllShows] = useState([]);
  const { detail, loading } = useFetchSingle(
    requests.requestSearch(keyword, page)
  );
  useEffect(() => {
    detail?.results && setAllShows([...detail.results]);
    if (detail?.results?.length === 0) {
      setAllShows([]);
    }
  }, [detail, keyword]);
  const handleNext = () => {
    setPage((p) => p + 1);
  };
  const handlePrev = () => {
    setPage((p) => p - 1);
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
      <h3 className="text-[1.3rem] px-3 mt-3">
        Searched for: (
        <span className="text-[var(--main-color)]">{keyword}</span>)
      </h3>
      <div className="flex flex-wrap px-6 justify-center mt-4">
        {loading ? (
          <p className="w-full flex justify-center">
            <FaC className="animate-spin text-center text-[2rem]" />
          </p>
        ) : (
          allShows?.map((item, id) => <Movie detail={item} key={id + 1} />)
        )}
      </div>
      {detail?.results?.length === 0 && (
        <div className="text-center h-[200px] my-[4rem]">No results Found!</div>
      )}
      <div className="flex justify-center gap-x-2 my-5">
        {page !== 1 && (
          <div className="flex justify-center">
            <div
              onClick={handlePrev}
              className="border rounded cursor-pointer px-4 py-2 active:scale-[0.9] hover:text-[var(--main-color)]"
            >
              Prev
            </div>
          </div>
        )}
        <div className="mt-2">
          {page}/{detail?.total_pages}
        </div>
        {detail?.total_pages !== page && (
          <div className="flex justify-center">
            <div
              onClick={handleNext}
              className="border rounded cursor-pointer px-4 py-2 active:scale-[0.9] hover:text-[var(--main-color)]"
            >
              Next
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchedShowPage;
