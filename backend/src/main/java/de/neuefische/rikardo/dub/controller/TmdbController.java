package de.neuefische.rikardo.dub.controller;


import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MoviePreview;
import de.neuefische.rikardo.dub.service.ActorService;
import de.neuefische.rikardo.dub.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search/movie/{name}")
    public List<MoviePreview> getMoviePreviewsByName(@PathVariable String name) {
        return movieService.getMoviePreviewsByName(name);
    }

    @GetMapping("/search/actor/{name}")
    public List<ActorPreview> getActorsPreviewsName(@PathVariable String name) {
        return actorService.getActorPreviewsByName(name);
    }

    @GetMapping("/actor/{id}")
    public Actor getActorById(@PathVariable String id) {
        return actorService.getActorById(id);
    }

    @GetMapping("/movie/{id}")
    public Movie getMovieById(@PathVariable String id) {
        return movieService.getMovieById(id);
    }

    @GetMapping("/movie/{id}/crew")
    public List<ActorPreview> getMovieCrewById(@PathVariable String id) {
        return movieService.getMovieCrewById(id);
    }

}
