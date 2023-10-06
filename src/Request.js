const key = import.meta.env.VITE_TMDB_API_KEY;
const url = "https://api.themoviedb.org/3";

const requests = {
  requestVideos: (type, id) => `${url}/${type}/${id}/videos?api_key=${key}`,
  requestSearch: (keyword, page) => `${url}/search/multi?api_key=${key}&query=${keyword}&page=${page}`,
  requestDiscover: (type, page) => `${url}/discover/${type}?api_key=${key}&page=${page}`,
  requestTrending: (type) => `${url}/trending/${type}/week?api_key=${key}`,
  requestPopular: (type) => `${url}/${type}/popular?api_key=${key}`,
  requestTopRated: (type) => `${url}/${type}/top_rated?api_key=${key}`,
  request_now_playing: `${url}/movie/now_playing?api_key=${key}`,
  requestUpcoming: `${url}/movie/upcoming?api_key=${key}`,
  requestOn_the_air_tv: `${url}/tv/on_the_air?api_key=${key}`,
  request_airing_today_tv: `${url}/tv/airing_today?api_key=${key}`,
  request_details: (id, type) => `${url}/${type}/${id}?api_key=${key}`,
  request_credits: (id, type) => `${url}/${type}/${id}/credits?api_key=${key}`,
  requestRecommendation: (id, type) => `${url}/${type}/${id}/recommendations?api_key=${key}`
}


export default requests;
