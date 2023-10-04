import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass, FaX } from "react-icons/fa6";
import useFetchSingle from "../hooks/useFetchSingle";
import requests from "../Request";
import { Link, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [isType, setIsType] = useState(false);
  const [keyword, setKeyword] = useState("");
  const searchBoxRef = useRef();
  const displayRef = useRef();

  const { detail } = useFetchSingle(requests.requestSearch(keyword, 1));
  const navigate = useNavigate();

  useEffect(() => {
    //hide search box on clicked outside
    const handleClickOutside = (event) => {
      if (displayRef.current && !displayRef.current.contains(event.target)) {
        setIsType(false);
      }
    };
    // Add a click event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClearSearchBox = () => {
    searchBoxRef.current.value = "";
    setIsType(false);
  };

  const handleKeyUp = (e) => {
    setIsType(true);
    setKeyword(searchBoxRef.current.value);
    if (searchBoxRef.current.value === "") {
      setIsType(false);
      return;
    }
    if (e.key === "Enter") {
      navigate(`/searchShows/${keyword}/1`);
      setIsType(false);
    }
  };
  return (
    <div
      ref={displayRef}
      className="relative w-[17rem] md:w-[23rem] text-[var(--text-color)]"
    >
      <input
        onClick={() => setIsType(true)}
        onKeyUp={handleKeyUp}
        type="text"
        ref={searchBoxRef}
        placeholder="Search"
        className="bg-black/90 outline-[var(--main-color)] border-white rounded px-2 py-2 w-full"
      />
      {isType ? (
        <FaX
          onClick={handleClearSearchBox}
          className="absolute top-[0.8rem] right-[1rem] cursor-pointer text-[0.8rem]"
        />
      ) : (
        <FaMagnifyingGlass className="absolute top-[0.7rem] right-[1rem] cursor-pointer" />
      )}
      {isType && (
        <div className="w-full bg-black rounded-b max-h-[20rem] shadow-lg px-1 gap-y-2 absolute flex flex-col overflow-y-scroll scrollbar-hide z-[99]">
          {detail?.results?.length === 0 && (
            <div className="text-center py-3">No results</div>
          )}
          {detail?.results?.map((show, id) => {
            return (
              <Link
                onClick={() => setIsType(false)}
                to={
                  show?.title
                    ? "/allmovies/" + show.id
                    : "/allseries/" + show.id
                }
                key={id + 1}
                className="h-[5rem] hover:bg-[var(--main-color)] w-full flex items-center rounded border border-b-slate-300"
              >
                <div className="w-[20%] my-1 mx-2">
                  {!show?.poster_path ? (
                    <div className="w-[50px] h-[75px] bg-white/20 text-[grey] flex justify-center items-center">
                      img
                    </div>
                  ) : (
                    <img
                      className="w-[50px] h-[75px] rounded"
                      src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`}
                      alt={show?.title || show?.name}
                    />
                  )}
                </div>
                <div className="w-[70%] text-[0.8rem] md:text-[1rem]">
                  {show.title || show.name}
                </div>
              </Link>
            );
          })}
          {detail?.total_pages > 1 && (
            <Link
              onClick={() => setIsType(false)}
              to={`/searchShows/${keyword}/1`}
              className="text-center text-[var(--main-color)] mb-3"
            >
              See all
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
