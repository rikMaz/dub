package de.neuefische.rikardo.dub.controller;


import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.service.ActorService;
import de.neuefische.rikardo.dub.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class ApiController {

    private final MovieService movieService;
    private final ActorService actorService;

    @Autowired
    public ApiController(MovieService movieService, ActorService actorService) {
        this.movieService = movieService;
        this.actorService = actorService;
    }

    @GetMapping("/search/movie/{name}")
    public List<Movie> getMovieSearchResultByName(@PathVariable String name) {
        return movieService.getMovieSearchResultByName(name);
    }

    @GetMapping("/search/actor/{name}")
    public List<Actor> getActorSearchResultByName(@PathVariable String name) {
        return actorService.getActorSearchResultByName(name);
    }

    @GetMapping("/actor/{id}")
    public Actor getActorDetailsById(@PathVariable String id) {
        return actorService.getActorDetailsById(id);
    }

    @GetMapping("/movie/{id}")
    public Movie getMovieDetailsById(@PathVariable String id) {
        return movieService.getMovieDetailsById(id);
    }

    @GetMapping("/movie/{id}/crew")
    public List<Actor> getMovieCrewById(@PathVariable String id) {
        return movieService.getMovieCrewById(id);
    }

}
