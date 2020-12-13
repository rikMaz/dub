import {axiosClient} from "./axiosClient";

const header = (token, options = {}) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...options
  },
});

export const getMoviesByName = (name, token) =>
  axiosClient.get("/api/search/movie/" + name, header(token)).then((response) => response.data);

export const getMovieById = (id, token) =>
  axiosClient.get("/api/movie/" + id, header(token)).then((response) => response.data);

export const getActorsByName = (name, token) =>
  axiosClient.get("/api/search/actor/" + name, header(token)).then((response) => response.data);

export const getActorById = (id, token) =>
  axiosClient.get("/api/actor/" + id, header(token)).then((response) => response.data);

export const getMovieCrewById = (id, token) =>
  axiosClient.get("/api/movie/" + id + "/crew", header(token)).then((response) => response.data);

export const getVoiceActorsByName = (name, token) =>
  axiosClient.get("/database/voiceactor/name/" + name, header(token)).then((response) => response.data);

export const getVoiceActorById = (id, token) =>
  axiosClient.get("/database/voiceactor/id/" + id, header(token)).then((response) => response.data);

export function uploadImage(file, token) {
  const formData = new FormData();
  formData.append('image', file);
  return axiosClient
    .post('/aws/image/', formData, header(token, {'Content-Type': 'multipart/form-data'}))
    .then((response) => response.data);
}

export function uploadAudio(file, token) {
  const formData = new FormData();
  formData.append('audio', file);
  return axiosClient
    .post('/azure/audio/', formData, header(token, {'Content-Type': 'multipart/form-data'}))
    .then((response) => response.data);
}