package de.neuefische.rikardo.dub.controller;


import de.neuefische.rikardo.dub.model.actor.ActorSearchList;
import de.neuefische.rikardo.dub.model.movie.MovieSearchList;
import de.neuefische.rikardo.dub.service.ActorService;
import de.neuefische.rikardo.dub.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class TmdbController {

    private final MovieService movieService;
    private final ActorService actorService;

    @Autowired
    public TmdbController(MovieService movieService, ActorService actorService) {
        this.movieService = movieService;
        this.actorService = actorService;
    }

    @GetMapping("/movie/{name}")
    public MovieSearchList getMovieSearchListByName(@PathVariable String name) {
        return movieService.getMovieSearchListByName(name);
    }

    @GetMapping("/actor/{name}")
    public ActorSearchList getActorSearchListByName(@PathVariable String name) {
        return actorService.getActorSearchListByName(name);
    }

}
