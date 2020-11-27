import axios from "axios";

export const getMoviesByName = (name) =>
  axios.get("/api/search/movie/" + name).then((response) => response.data);

export const getMovieById = (id) =>
  axios.get("/api/movie/" + id).then((response) => response.data);

export const getActorsByName = (name) =>
  axios.get("/api/search/actor/" + name).then((response) => response.data);

export const getActorById = (id) =>
  axios.get("/api/actor/" + id).then((response) => response.data);

export const getMovieCrewById = (id) =>
  axios.get("/api/movie/" + id + "/crew").then((response) => response.data);

export const getVoiceActorsByName = (name) =>
  axios.get("/database/voiceactor/name/" + name).then((response) => response.data);

export const getVoiceActorById = (id) =>
  axios.get("/database/voiceactor/id/" + id).then((response) => response.data);

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