package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MoviePreview;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final TmdbService tmdbService;

    private final String tmdbUrlPath = "https://image.tmdb.org/t/p/w500";

    public MovieService(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    public List<MoviePreview> getMoviePreviewsByName(String name) {

        return tmdbService.getTmdbMoviesByName(name)
                .stream()
                .filter(item -> item.getPoster_path() != null)
                .map(tmdbMovie -> MoviePreview.builder()
                        .id(tmdbMovie.getId())
                        .name(tmdbMovie.getTitle())
                        .image(tmdbUrlPath + tmdbMovie.getPoster_path())
                        .type("movie")
                        .build())
                .collect(Collectors.toList());
    }

    public List<MoviePreview> getMoviePreviewsById(String id) {

        return tmdbService.getTmdbActorMovieCreditsById(id)
                .stream()
                .filter(item -> item.getPoster_path() != null)
                .map(tmdbMovie -> MoviePreview.builder()
                        .id(tmdbMovie.getId())
                        .name(tmdbMovie.getTitle())
                        .image(tmdbUrlPath + tmdbMovie.getPoster_path())
                        .type("movie")
                        .build())
                .collect(Collectors.toList());
    }



    public Movie getMovieById(String id) {
        TmdbMovie tmdbMovie = tmdbService.getTmdbMovieById(id);
        return Movie.builder()
                .id(tmdbMovie.getId())
                .name(tmdbMovie.getTitle())
                .image(tmdbUrlPath + tmdbMovie.getPoster_path())
                .overview(tmdbMovie.getOverview())
                .releaseDate(tmdbMovie.getRelease_date())
                .runtime(tmdbMovie.getRuntime())
                .originalLanguage(tmdbMovie.getOriginal_language())
                .budget(tmdbMovie.getBudget())
                .revenue(tmdbMovie.getRevenue())
                .type("movie")
                .build();
    }

    public List<ActorPreview> getMovieCrewById(String id) {

        return tmdbService.getTmdbMovieCrewById(id)
                .stream()
                .filter(item -> item.getProfile_path() != null)
                .filter(item -> item.getKnown_for_department().equals("Acting"))
                .map(tmdbActor -> ActorPreview.builder()
                        .id(tmdbActor.getId())
                        .name(tmdbActor.getName())
                        .character(tmdbActor.getCharacter())
                        .image(tmdbUrlPath + tmdbActor.getProfile_path())
                        .type("actor")
                        .build())
                .collect(Collectors.toList());
    }
}
