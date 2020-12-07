import axios from "axios";

const header = (token, options = {}) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...options
  },
});

export const getMoviesByName = (name, token) =>
  axios.get("/api/search/movie/" + name, header(token)).then((response) => response.data);

export const getMovieById = (id, token) =>
  axios.get("/api/movie/" + id, header(token)).then((response) => response.data);

export const getActorsByName = (name, token) =>
  axios.get("/api/search/actor/" + name, header(token)).then((response) => response.data);

export const getActorById = (id, token) =>
  axios.get("/api/actor/" + id, header(token)).then((response) => response.data);

export const getMovieCrewById = (id, token) =>
  axios.get("/api/movie/" + id + "/crew", header(token)).then((response) => response.data);

export const getVoiceActorsByName = (name, token) =>
  axios.get("/database/voiceactor/name/" + name, header(token)).then((response) => response.data);

export const getVoiceActorById = (id, token) =>
  axios.get("/database/voiceactor/id/" + id, header(token)).then((response) => response.data);

export function uploadImage(file, token) {
  const formData = new FormData();
  formData.append('image', file);
  return axios
    .post('/aws/image/', formData, header(token, {'Content-Type': 'multipart/form-data'}))
    .then((response) => response.data);
}

export function uploadAudio(file, token) {
  const formData = new FormData();
  formData.append('audio', file);
  return axios
    .post('/azure/audio/', formData, header(token, {'Content-Type': 'multipart/form-data'}))
    .then((response) => response.data);
}