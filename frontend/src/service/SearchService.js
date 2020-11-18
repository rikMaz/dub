import axios from "axios";

export const getMovieSearchResultByName = (name) =>
  axios.get("/api/search/movie/" + name).then((response) => response.data);