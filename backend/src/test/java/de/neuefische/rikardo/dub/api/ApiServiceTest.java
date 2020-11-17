package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieSearchList;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class ApiServiceTest {


    final ApiService apiService = new ApiService();

    final RestTemplate restTemplate = mock(RestTemplate.class);


    @Test
    @DisplayName("The method should return a Movie after searching it by name")
    void searchMovieDetailsByNameTest() {
        //GIVEN
        String movieName = "The Matrix";
        String apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + "apiKey" + "&query=the matrix";

        MovieSearchList movieSearchList = new MovieSearchList(new ArrayList<>(List.of(
                new Movie("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg")
        )));

        ResponseEntity<MovieSearchList> response = new ResponseEntity(movieSearchList,HttpStatus.OK);
        when(restTemplate.getForEntity(apiUrl, MovieSearchList.class)).thenReturn(response);

        //WHEN
        MovieSearchList result = response.getBody();

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(result,is(movieSearchList));

    }

    @Test
    @DisplayName("The method should return a valid URL query")
    void buildApiUrlToSearchMovieDetailsByNameTest() {
        //GIVEN
        String movieName = "The Matrix";
        String apiKey = null;
        //WHEN
        String result = apiService.buildApiUrlToGetMovieDetailsByName(movieName);
        //THEN
        assertThat(result,is("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=the matrix"));
    }

}