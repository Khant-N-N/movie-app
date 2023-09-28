
const key = import.meta.env.VITE_MOVIEDB_API_KEY;
const url = "https://api.themoviedb.org/3";

const requests = {
  requestPopular: `${url}/movie/popular?api_key=${key}`,
  requestTopRated: `${url}/movie/top_rated?api_key=${key}`,
  requestUpcoming: `${url}/movie/upcoming?api_key=${key}`,
}

export default requests;
