package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.SearchMovieList;
import de.neuefische.rikardo.dub.model.movie.SearchMovieListResult;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApiServiceTest {


    @Value("${tmdb.api.key}")
    private String apiKey;


    final ApiService apiService = new ApiService();

    @Test
    @DisplayName("The method should return a Movie after searching it by name")
    void searchMovieDetailsByNameTest() {
        //GIVEN
        String movieName = "The Matrix";
        String apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=the matrix";

        SearchMovieListResult searchMovieListResult = new SearchMovieListResult(603,"The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg");
        RestTemplate restTemplate = new RestTemplate();

        //WHEN
        ResponseEntity<SearchMovieList> response = restTemplate.getForEntity(apiUrl, SearchMovieList.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getResults().get(0),is(searchMovieListResult));

    }

    @Test
    @DisplayName("The method should return a valid URL query")
    void buildApiUrlToSearchMovieDetailsByNameTest() {
        //GIVEN
        String movieName = "The Matrix";
        //WHEN
        String result = apiService.buildApiUrlToSearchMovieDetailsByName(movieName);
        //THEN
        assertThat(result,is("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=the matrix"));
    }

}