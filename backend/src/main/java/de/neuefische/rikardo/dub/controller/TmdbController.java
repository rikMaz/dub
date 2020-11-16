package de.neuefische.rikardo.dub.controller;


import de.neuefische.rikardo.dub.model.movie.SearchMovieList;
import de.neuefische.rikardo.dub.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class TmdbController {

    private final MovieService movieService;

    @Autowired
    public TmdbController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movie/{movieName}")
    public SearchMovieList getMovieDetailsByName(@PathVariable String movieName) {
        return movieService.getMovieDetailsByName(movieName);
    }

}
