package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ApiActor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.ApiMovie;
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
        for (ApiMovie apiMovie : apiService.getMovieSearchResultByName(name)) {
            Movie movie = new Movie(
                    apiMovie.getId(),
                    apiMovie.getTitle(),
                    apiMovie.getPoster_path(),
                    apiMovie.getOverview(),
                    apiMovie.getRelease_date(),
                    apiMovie.getRuntime(),
                    apiMovie.getOriginal_language(),
                    apiMovie.getBudget(),
                    apiMovie.getRevenue(),
                    "movie");
            movies.add(movie);
        }

        return movies.stream()
                .filter(item -> item.getImage() != null)
                .collect(Collectors.toList());
    }

    public Movie getMovieDetailsById(String id) {
        ApiMovie apiMovie = apiService.getMovieDetailsById(id);
        return new Movie(
                apiMovie.getId(),
                apiMovie.getTitle(),
                apiMovie.getPoster_path(),
                apiMovie.getOverview(),
                apiMovie.getRelease_date(),
                apiMovie.getRuntime(),
                apiMovie.getOriginal_language(),
                apiMovie.getBudget(),
                apiMovie.getRevenue(),
                "movie");
    }

    public List<Actor> getMovieCrewById(String id) {

        List<Actor> actors = new ArrayList<>();
        List<ApiActor> apiActors = apiService.getMovieCrewById(id)
                .stream()
                .filter(item -> item.getProfile_path() != null)
                .filter(item -> item.getKnown_for_department().equals("Acting"))
                .collect(Collectors.toList());

        for (ApiActor apiActor: apiActors) {
            Actor actor = new Actor(
                    apiActor.getId(),
                    apiActor.getName(),
                    apiActor.getProfile_path(),
                    apiActor.getCharacter(),
                    apiActor.getBiography(),
                    apiActor.getBirthday(),
                    apiActor.getPlace_of_birth(),
                    apiActor.getKnown_for_department());
            actors.add(actor);
        }

        return actors;
    }
}
