package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.service.TmdbService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

class TmdbServiceTest {

    final TmdbService tmdbService = new TmdbService();

    final String urlBasis = "https://api.themoviedb.org/3/";

    @Test
    @DisplayName("The method should return a valid URL to search for a movie name")
    void buildApiUrlToSearchMovieByNameTest() {
        //GIVEN
        String name = "The Matrix";
        //WHEN
        String result = tmdbService.buildApiUrl(true,false,false,name,"","movie");
        //THEN
        assertThat(result,is(urlBasis + "search/movie?api_key=" + null + "&query=the matrix"));
    }

    @Test
    @DisplayName("The method should return a valid URL to search for a actor name")
    void buildApiUrlToSearchActorByNameTest() {
        //GIVEN
        String name = "Daniel Craig";
        //WHEN
        String result = tmdbService.buildApiUrl(true,false,false,name,"","person");
        //THEN
        assertThat(result,is(urlBasis + "search/person?api_key=" + null + "&query=daniel craig"));
    }

    @Test
    @DisplayName("The method should return a valid URL to get a actor by id")
    void buildApiUrlToGetActorByIdTest() {
        //GIVEN
        String id = "8784";
        //WHEN
        String result = tmdbService.buildApiUrl(false,false,false,"",id,"person");
        //THEN
        assertThat(result,is(urlBasis + "person/8784?api_key=" + null));
    }

    @Test
    @DisplayName("The method should return a valid URL to get a movie by id")
    void buildApiUrlToGetMovieByIdTest() {
        //GIVEN
        String id = "550";
        //WHEN
        String result = tmdbService.buildApiUrl(false,false,false,"",id,"movie");
        //THEN
        assertThat(result,is(urlBasis + "movie/550?api_key=" + null));
    }

    @Test
    @DisplayName("The method should return a valid URL to get the movie crew by id")
    void buildApiUrlToGetMovieCrewByIdTest() {
        //GIVEN
        String id = "550";
        //WHEN
        String result = tmdbService.buildApiUrl(false,true,false,"",id,"movie");
        //THEN
        assertThat(result,is(urlBasis + "movie/550/credits?api_key=" + null));
    }

    @Test
    @DisplayName("The method should return a valid URL to get the movie credits of actor by id")
    void buildApiUrlToGetActorMovieCreditsByIdTest() {
        //GIVEN
        String id = "8784";
        //WHEN
        String result = tmdbService.buildApiUrl(false,false,true,"",id,"person");
        //THEN
        assertThat(result,is(urlBasis + "person/8784/movie_credits?api_key=" + null));
    }

}