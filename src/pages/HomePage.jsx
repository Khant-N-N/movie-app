import React from "react";
import Hero from "../components/Hero";
import MoviePath from "../components/moviePath";
import requests from "../Request";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <MoviePath
        ids="1"
        topic="Popular Now"
        fetchData={requests.requestPopular}
      />
      <MoviePath
        ids="2"
        topic="Upcoming"
        fetchData={requests.requestUpcoming}
      />

      <MoviePath
        ids="4"
        topic="Top Rated"
        fetchData={requests.requestTopRated}
      />
    </div>
  );
};

export default HomePage;
