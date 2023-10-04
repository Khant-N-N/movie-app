import React from "react";
import SeriesDetails from "./Series/SeriesDetails";
import MovieDetails from "./Movies/MovieDetails";
import Casts from "../components/Casts";
import Recommendation from "../components/Recommendation";

const DetailPage = ({ type }) => {
  return (
    <>
      {type === "movie" && <MovieDetails />}
      {type === "tv" && <SeriesDetails />}

      <Casts type={type} />
      <Recommendation type={type} />
    </>
  );
};

export default DetailPage;
