package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieSearchList;
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
    @DisplayName("The method should return a Movie by the given name")
    void getMovieDetailsByNameTest() {
        //GIVEN
        String movieName = "somename";

        MovieSearchList movieSearchList = new MovieSearchList(new ArrayList<>(List.of(
                new Movie("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg")
        )));

        when(apiService.getMovieSearchListByName(movieName)).thenReturn(movieSearchList);

        //WHEN
        MovieSearchList result = movieService.getMovieSearchListByName(movieName);

        //THEN
        assertThat(result,is(movieSearchList));

    }

}