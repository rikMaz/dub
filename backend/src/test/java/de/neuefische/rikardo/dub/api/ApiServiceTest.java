package de.neuefische.rikardo.dub.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

class ApiServiceTest {

    final ApiService apiService = new ApiService();

    final String urlBasis = "https://api.themoviedb.org/3/";

    @Test
    @DisplayName("The method should return a valid URL to search for a movie name")
    void buildApiUrlToSearchMovieByNameTest() {
        //GIVEN
        String name = "The Matrix";
        //WHEN
        String result = apiService.buildApiUrl(true,false,name,"","movie");
        //THEN
        assertThat(result,is(urlBasis + "search/movie?api_key=" + null + "&query=the matrix"));
    }

    @Test
    @DisplayName("The method should return a valid URL to search for a actor name")
    void buildApiUrlToSearchActorByNameTest() {
        //GIVEN
        String name = "Daniel Craig";
        //WHEN
        String result = apiService.buildApiUrl(true,false,name,"","person");
        //THEN
        assertThat(result,is(urlBasis + "search/person?api_key=" + null + "&query=daniel craig"));
    }

    @Test
    @DisplayName("The method should return a valid URL to get a actor by id")
    void buildApiUrlToGetActorByIdTest() {
        //GIVEN
        String id = "8784";
        //WHEN
        String result = apiService.buildApiUrl(false,false,"",id,"person");
        //THEN
        assertThat(result,is(urlBasis + "person/8784?api_key=" + null));
    }

    @Test
    @DisplayName("The method should return a valid URL to get a movie by id")
    void buildApiUrlToGetMovieByIdTest() {
        //GIVEN
        String id = "550";
        //WHEN
        String result = apiService.buildApiUrl(false,false,"",id,"movie");
        //THEN
        assertThat(result,is(urlBasis + "movie/550?api_key=" + null));
    }

    @Test
    @DisplayName("The method should return a valid URL to get the movie crew by id")
    void buildApiUrlToGetMovieCrewByIdTest() {
        //GIVEN
        String id = "550";
        //WHEN
        String result = apiService.buildApiUrl(false,true,"",id,"movie");
        //THEN
        assertThat(result,is(urlBasis + "movie/550/credits?api_key=" + null));
    }

}