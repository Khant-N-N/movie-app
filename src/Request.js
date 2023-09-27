
const key = "39d55cfb7a255ff32ed452c4e8a5fde5";
const url = "https://api.themoviedb.org/3";

const requests = {
  requestPopular: `${url}/movie/popular?api_key=${key}`,
  requestTopRated: `${url}/movie/top_rated?api_key=${key}`,
  requestUpcoming: `${url}/movie/upcoming?api_key=${key}`,
}

export default requests;
