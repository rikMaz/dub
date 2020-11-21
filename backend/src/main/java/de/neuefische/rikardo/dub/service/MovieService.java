package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorCatch;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCatch;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final ApiService apiService;

    public MovieService(ApiService apiService) {
        this.apiService = apiService;
    }

    public List<Movie> getMovieSearchResultByName(String name) {

        List<Movie> movies = new ArrayList<>();
        for (MovieCatch movieCatch: apiService.getMovieSearchResultByName(name)) {
            Movie movie = new Movie(
                    movieCatch.getId(),
                    movieCatch.getTitle(),
                    movieCatch.getPoster_path(),
                    movieCatch.getOverview(),
                    movieCatch.getRelease_date(),
                    movieCatch.getRuntime(),
                    movieCatch.getOriginal_language(),
                    movieCatch.getBudget(),
                    movieCatch.getRevenue(),
                    "movie");
            movies.add(movie);
        }

        return movies.stream()
                .filter(item -> item.getImage() != null)
                .collect(Collectors.toList());
    }

    public Movie getMovieDetailsById(String id) {
        MovieCatch movieCatch = apiService.getMovieDetailsById(id);
        return new Movie(
                movieCatch.getId(),
                movieCatch.getTitle(),
                movieCatch.getPoster_path(),
                movieCatch.getOverview(),
                movieCatch.getRelease_date(),
                movieCatch.getRuntime(),
                movieCatch.getOriginal_language(),
                movieCatch.getBudget(),
                movieCatch.getRevenue(),
                "movie");
    }

    public List<Actor> getMovieCrewById(String id) {

        List<Actor> actors = new ArrayList<>();
        for (ActorCatch actorCatch: apiService.getMovieCrewById(id)){
            Actor actor = new Actor(
                    actorCatch.getId(),
                    actorCatch.getName(),
                    actorCatch.getProfile_path(),
                    actorCatch.getCharacter(),
                    actorCatch.getBiography(),
                    actorCatch.getBirthday(),
                    actorCatch.getPlace_of_birth(),
                    actorCatch.getKnown_for_department());
            actors.add(actor);
        }

        return actors.stream()
                .filter(item -> item.getImage() != null)
                .collect(Collectors.toList());
    }
}
