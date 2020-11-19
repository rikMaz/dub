package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCatch;
import de.neuefische.rikardo.dub.model.movie.MovieCrew;
import de.neuefische.rikardo.dub.model.movie.MovieSearchResult;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    final ApiService apiService = mock(ApiService.class);

    final MovieService movieService = new MovieService(apiService);

    @Test
    @DisplayName("The method should return the MovieSearchResult by name")
    void getMovieSearchResultByNameTest() {
        //GIVEN
        String name = "The Matrix";

        List<MovieCatch> movieCatch = new ArrayList<>(List.of(
                new MovieCatch("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg")
        ));

        List<Movie> movies = new ArrayList<>(List.of(
                new Movie("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg","movie")
        ));

        when(apiService.getMovieSearchResultByName(name)).thenReturn(movieCatch);
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

        Movie movie = new Movie("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg","movie");

        when(apiService.getMovieDetailsById(id)).thenReturn(movie);
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

        MovieCrew movieCrew = new MovieCrew(new ArrayList<>(List.of(
                new Actor("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting")
        )));

        when(apiService.getMovieCrewById(id)).thenReturn(movieCrew);
        //WHEN
        MovieCrew result = movieService.getMovieCrewById(id);
        //THEN
        assertThat(result,is(movieCrew));
    }

}