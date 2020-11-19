package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCatch;
import de.neuefische.rikardo.dub.model.movie.MovieCrew;
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
        for (MovieCatch item: apiService.getMovieSearchResultByName(name)) {
            Movie movie = new Movie(item.getId(),item.getTitle(),item.getPoster_path(),"movie");
            movies.add(movie);
        }

        return movies.stream()
                .filter(item -> item.getImage() != null)
                .collect(Collectors.toList());
    }

    public Movie getMovieDetailsById(String id) {
        return apiService.getMovieDetailsById(id);
    }

    public MovieCrew getMovieCrewById(String id) {
        return apiService.getMovieCrewById(id);
    }
}
