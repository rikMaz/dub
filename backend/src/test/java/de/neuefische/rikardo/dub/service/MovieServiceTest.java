package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.movie.SearchMovieList;
import de.neuefische.rikardo.dub.model.movie.SearchMovieListResult;
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

        List<SearchMovieListResult> searchMovieListResults = new ArrayList<>(List.of(
                new SearchMovieListResult(1,"The Matrix", "/image.jpg")
        ));

        SearchMovieList searchMovieList = new SearchMovieList(searchMovieListResults);

        when(apiService.searchMovieDetailsByName(movieName)).thenReturn(searchMovieList);

        //WHEN
        SearchMovieList result = movieService.getMovieDetailsByName(movieName);

        //THEN
        assertThat(result,is(searchMovieList));

    }

}