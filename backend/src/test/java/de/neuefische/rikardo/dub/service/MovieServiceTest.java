package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    final TmdbService tmdbService = mock(TmdbService.class);

    final MovieService movieService = new MovieService(tmdbService);

    TmdbMovie tmdbMovie = new TmdbMovie("603","The Matrix", "/image.jpg","overview","1999-03-30","136","en","0","0");
    List<TmdbMovie> tmdbMovies = new ArrayList<>(List.of(tmdbMovie));

    Movie movie = new Movie("603","The Matrix", "https://image.tmdb.org/t/p/w154/image.jpg","overview","1999-03-30","136","en","0","0","movie");
    List<Movie> movies = new ArrayList<>(List.of(movie));

    List<TmdbActor> tmdbActors = new ArrayList<>(List.of(
            new TmdbActor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting")
    ));

    List<Actor> actors = new ArrayList<>(List.of(
            new Actor("6384","Keanu Reeves","https://image.tmdb.org/t/p/w154/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","actor",null)
    ));

    @Test
    @DisplayName("The method should return the MovieSearchResult by name")
    void getMovieSearchResultByNameTest() {
        //GIVEN
        String name = "The Matrix";
        when(tmdbService.getMovieSearchResultByName(name)).thenReturn(tmdbMovies);
        //WHEN
        List<Movie> result = movieService.getMovieSearchResultByName(name);
        //THEN
        assertThat(result,is(movies));
    }

    @Test
    @DisplayName("The method should return the movie details by id")
    void getMovieDetailsByIdTest() {
        //GIVEN
        String id = "603";
        when(tmdbService.getMovieDetailsById(id)).thenReturn(tmdbMovie);
        //WHEN
        Movie result = movieService.getMovieDetailsById(id);
        //THEN
        assertThat(result,is(movie));
    }

    @Test
    @DisplayName("The method should return the movie crew by id")
    void getMovieCrewByIdTest() {
        //GIVEN
        String id = "603";
        when(tmdbService.getMovieCrewById(id)).thenReturn(tmdbActors);
        //WHEN
        List<Actor> result = movieService.getMovieCrewById(id);
        //THEN
        assertThat(result,is(actors));
    }

}