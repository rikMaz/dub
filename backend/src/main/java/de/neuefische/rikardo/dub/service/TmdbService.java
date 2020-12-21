package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.actor.TmdbActorList;
import de.neuefische.rikardo.dub.model.actor.TmdbActorMovieCredits;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import de.neuefische.rikardo.dub.model.movie.TmdbMovieCrew;
import de.neuefische.rikardo.dub.model.movie.TmdbMovieList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@Service
public class TmdbService {

    @Value("${tmdb.api.key:defaultApiKeyPlaceholder}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<TmdbMovie> getTmdbMoviesByName(String name) {
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + name;
        ResponseEntity<TmdbMovieList> response = restTemplate.getForEntity(url, TmdbMovieList.class);
        return Objects.requireNonNull(response.getBody()).getMovies();
    }

    public List<TmdbActor> getTmdbActorsByName(String name) {
        String url = "https://api.themoviedb.org/3/search/person?api_key=" + apiKey + "&query=" + name;
        ResponseEntity<TmdbActorList> response = restTemplate.getForEntity(url, TmdbActorList.class);
        return Objects.requireNonNull(response.getBody()).getActors();
    }

    public TmdbActor getTmdbActorById(String id) {
        String url = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
        ResponseEntity<TmdbActor> response = restTemplate.getForEntity(url, TmdbActor.class);
        return response.getBody();
    }

    public List<TmdbMovie> getTmdbActorMovieCreditsById(String id) {
        String url = "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=" + apiKey;
        ResponseEntity<TmdbActorMovieCredits> response = restTemplate.getForEntity(url, TmdbActorMovieCredits.class);
        return Objects.requireNonNull(response.getBody()).getMovieList();
    }

    public TmdbMovie getTmdbMovieById(String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
        ResponseEntity<TmdbMovie> response = restTemplate.getForEntity(url, TmdbMovie.class);
        return response.getBody();
    }

    public List<TmdbActor> getTmdbMovieCrewById(String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + apiKey;
        ResponseEntity<TmdbMovieCrew> response = restTemplate.getForEntity(url, TmdbMovieCrew.class);
        return Objects.requireNonNull(response.getBody()).getMovieCrew();
    }
}