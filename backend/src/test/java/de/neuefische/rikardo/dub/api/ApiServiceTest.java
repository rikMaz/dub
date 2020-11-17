package de.neuefische.rikardo.dub.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

class ApiServiceTest {

    final ApiService apiService = new ApiService();

    @Test
    @DisplayName("The method should return a valid URL query")
    void buildApiUrlToSearchMovieDetailsByNameTest() {
        //GIVEN
        String movieName = "The Matrix";
        String type = "movie";
        String apiKey = null;
        //WHEN
        String result = apiService.buildApiUrlToSearchByName(movieName,type);
        //THEN
        assertThat(result,is("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=the matrix"));
    }

}