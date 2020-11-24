import axios from "axios";

export const getMovieSearchResultByName = (name) =>
  axios.get("/api/search/movie/" + name).then((response) => response.data);

export const getMovieDetailsById = (id) =>
  axios.get("/api/movie/" + id).then((response) => response.data);

export const getActorSearchResultByName = (name) =>
  axios.get("/api/search/actor/" + name).then((response) => response.data);

export const getActorDetailsById = (id) =>
  axios.get("/api/actor/" + id).then((response) => response.data);

export const getMovieCrewById = (id) =>
  axios.get("/api/movie/" + id + "/crew").then((response) => response.data);

export function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  return axios
    .post('/aws/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
}

export const getVoiceActorSearchResultByName = (name) =>
  axios.get("/database/voiceactor/name/" + name).then((response) => response.data);

export const getVoiceActorDetailsById = (id) =>
  axios.get("/database/voiceactor/id/" + id).then((response) => response.data);