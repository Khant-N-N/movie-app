import React from "react";
import Hero from "../components/Hero";
import MoviePath from "../components/for movies/moviePath";
import requests from "../Request";

const HomePage = () => {
  return (
    <div>
      <Hero />

      <MoviePath
        ids="1"
        topic="Popular Now"
        fetchData={requests.requestPopular("movie")}
      />
      <MoviePath
        ids="2"
        topic="Upcoming"
        fetchData={requests.requestUpcoming}
      />

      <MoviePath
        ids="4"
        topic="Top Rated"
        fetchData={requests.requestTopRated("movie")}
      />
      <MoviePath
        ids="5"
        topic="Now Playing"
        fetchData={requests.request_now_playing}
      />

      <MoviePath
        ids="6"
        topic="Trending Series"
        fetchData={requests.requestTrending("tv")}
      />
    </div>
  );
};

export default HomePage;
