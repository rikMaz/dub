package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.movie.Movie;
import org.springframework.stereotype.Service;

@Service
public class ApiService {

    public Movie searchMovieDetailsByName(String movieName) {
        Movie movie = new Movie();
        return movie;
    }
}
