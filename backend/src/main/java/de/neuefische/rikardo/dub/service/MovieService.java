package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.SearchMovieList;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    private final ApiService apiService;

    public MovieService(ApiService apiService) {
        this.apiService = apiService;
    }

    public  SearchMovieList getMovieDetailsByName(String movieName) {
        return apiService.searchMovieDetailsByName(movieName);
    }

}
