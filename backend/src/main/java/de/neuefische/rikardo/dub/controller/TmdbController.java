package de.neuefische.rikardo.dub.controller;


import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/tmdb")
public class TmdbController {

    private final MovieService movieService;

    @Autowired
    public TmdbController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movie/{movieName}")
    public Movie getMovieDetailsByName(@RequestParam String movieName) {
        return movieService.getMovieDetailsByName(movieName);
    }

}
