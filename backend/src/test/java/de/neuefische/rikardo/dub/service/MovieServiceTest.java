package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.Movie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    final ApiService apiService = mock(ApiService.class);

    final MovieService movieService = new MovieService(apiService);

    @Test
    @DisplayName("The method should return a Movie by the given name")
    void getMovieDetailsByName() {
        //GIVEN
        String movieName = "somename";
        Movie movie = new Movie("John Wick","image.jpg");
        when(apiService.searchMovieDetailsByName(movieName)).thenReturn(movie);

        //WHEN
        Movie result = movieService.getMovieDetailsByName(movieName);

        //THEN
        assertThat(result,is(movie));

    }

}