package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final TmdbService tmdbService;

    private final String tmdbUrlPath = "https://image.tmdb.org/t/p/w154";

    public MovieService(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    public List<Movie> getMovieSearchResultByName(String name) {

        List<Movie> movies = new ArrayList<>();
        List<TmdbMovie> tmdbMovies = tmdbService.getMovieSearchResultByName(name)
                .stream()
                .filter(item -> item.getPoster_path() != null)
                .collect(Collectors.toList());

        for (TmdbMovie tmdbMovie : tmdbMovies) {
            Movie movie = new Movie(
                    tmdbMovie.getId(),
                    tmdbMovie.getTitle(),
                    tmdbUrlPath + tmdbMovie.getPoster_path(),
                    tmdbMovie.getOverview(),
                    tmdbMovie.getRelease_date(),
                    tmdbMovie.getRuntime(),
                    tmdbMovie.getOriginal_language(),
                    tmdbMovie.getBudget(),
                    tmdbMovie.getRevenue(),
                    "movie");
            movies.add(movie);
        }

        return movies;
    }

    public Movie getMovieDetailsById(String id) {
        TmdbMovie tmdbMovie = tmdbService.getMovieDetailsById(id);
        return new Movie(
                tmdbMovie.getId(),
                tmdbMovie.getTitle(),
                tmdbUrlPath + tmdbMovie.getPoster_path(),
                tmdbMovie.getOverview(),
                tmdbMovie.getRelease_date(),
                tmdbMovie.getRuntime(),
                tmdbMovie.getOriginal_language(),
                tmdbMovie.getBudget(),
                tmdbMovie.getRevenue(),
                "movie");
    }

    public List<Actor> getMovieCrewById(String id) {

        List<Actor> actors = new ArrayList<>();
        List<TmdbActor> tmdbActors = tmdbService.getMovieCrewById(id)
                .stream()
                .filter(item -> item.getProfile_path() != null)
                .filter(item -> item.getKnown_for_department().equals("Acting"))
                .collect(Collectors.toList());

        for (TmdbActor tmdbActor : tmdbActors) {
            Actor actor = new Actor(
                    tmdbActor.getId(),
                    tmdbActor.getName(),
                    tmdbUrlPath + tmdbActor.getProfile_path(),
                    tmdbActor.getCharacter(),
                    tmdbActor.getBiography(),
                    tmdbActor.getBirthday(),
                    tmdbActor.getPlace_of_birth(),
                    "actor",
                    null);
            actors.add(actor);
        }

        return actors;
    }
}
