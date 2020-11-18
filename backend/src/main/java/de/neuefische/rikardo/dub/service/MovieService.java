package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCrew;
import de.neuefische.rikardo.dub.model.movie.MovieSearchResult;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    private final ApiService apiService;

    public MovieService(ApiService apiService) {
        this.apiService = apiService;
    }

    public MovieSearchResult getMovieSearchResultByName(String name) {
        return apiService.getMovieSearchResultByName(name);
    }

    public Movie getMovieDetailsById(String id) {
        return apiService.getMovieDetailsById(id);
    }

    public MovieCrew getMovieCrewById(String id) {
        return apiService.getMovieCrewById(id);
    }
}
