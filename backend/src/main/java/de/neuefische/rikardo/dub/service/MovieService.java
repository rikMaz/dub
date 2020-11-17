package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.MovieSearchList;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    private final ApiService apiService;

    public MovieService(ApiService apiService) {
        this.apiService = apiService;
    }

    public MovieSearchList getMovieSearchListByName(String movieName) {
        return apiService.getMovieSearchListByName(movieName);
    }

}
