package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ApiActor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.ApiMovie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApiControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @MockBean
    private ApiService apiService;

    ApiMovie apiMovie = new ApiMovie("603","The Matrix", "/image.jpg","overview","1999-03-30","136","en","0","0");
    List<ApiMovie> apiMovies = new ArrayList<>(List.of(apiMovie));

    Movie movie = new Movie("603","The Matrix", "https://image.tmdb.org/t/p/w154/image.jpg","overview","1999-03-30","136","en","0","0","movie");
    List<Movie> movies = new ArrayList<>(List.of(movie));

    ApiActor apiActor = new ApiActor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting");
    List<ApiActor> apiActors = new ArrayList<>(List.of(apiActor));

    Actor actor = new Actor("6384","Keanu Reeves","https://image.tmdb.org/t/p/w154/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","actor");
    List<Actor> actors = new ArrayList<>(List.of(actor));


    @Test
    public void getMovieSearchResultByNameTest() {
        //GIVEN
        String name = "The Matrix";
        String url = "http://localhost:" + port + "/api/search/movie/" + name;
        when(apiService.getMovieSearchResultByName(name)).thenReturn(apiMovies);
        //WHEN
        ResponseEntity<Movie[]> response = testRestTemplate.getForEntity(url,Movie[].class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(movies.toArray()));
    }

    @Test
    public void getActorSearchResultByNameTest() {
        //GIVEN
        String name = "Keanu Reeves";
        String url = "http://localhost:" + port + "/api/search/actor/" + name;
        when(apiService.getActorSearchResultByName(name)).thenReturn(apiActors);
        //WHEN
        ResponseEntity<Actor[]> response = testRestTemplate.getForEntity(url,Actor[].class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actors.toArray()));
    }

    @Test
    public void getActorDetailsByIdTest() {
        //GIVEN
        String id = "6384";
        String url = "http://localhost:" + port + "/api/actor/" + id;
        when(apiService.getActorDetailsById(id)).thenReturn(apiActor);
        //WHEN
        ResponseEntity<Actor> response = testRestTemplate.getForEntity(url,Actor.class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actor));
    }

    @Test
    public void getMovieDetailsByIdTest() {
        //GIVEN
        String id = "603";
        String url = "http://localhost:" + port + "/api/movie/" + id;
        when(apiService.getMovieDetailsById(id)).thenReturn(apiMovie);
        //WHEN
        ResponseEntity<Movie> response = testRestTemplate.getForEntity(url,Movie.class);

        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(movie));
    }

    @Test
    public void getMovieCrewByIdTest() {
        //GIVEN
        String id = "603";
        String url = "http://localhost:" + port + "/api/movie/" + id + "/crew";
        when(apiService.getMovieCrewById(id)).thenReturn(apiActors);
        //WHEN
        ResponseEntity<Actor[]> response = testRestTemplate.getForEntity(url,Actor[].class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actors.toArray()));
    }


}