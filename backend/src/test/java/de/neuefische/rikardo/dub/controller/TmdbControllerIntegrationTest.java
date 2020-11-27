package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.service.TmdbService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
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
class TmdbControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @MockBean
    private TmdbService tmdbService;

    TmdbMovie tmdbMovie = new TmdbMovie("603","The Matrix", "/image.jpg","overview","1999-03-30","136","en","0","0");
    List<TmdbMovie> tmdbMovies = new ArrayList<>(List.of(tmdbMovie));

    Movie movie = new Movie("603","The Matrix", "https://image.tmdb.org/t/p/w154/image.jpg","overview","1999-03-30","136","en","0","0","movie");
    List<Movie> movies = new ArrayList<>(List.of(movie));

    TmdbActor tmdbActor = new TmdbActor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting");
    List<TmdbActor> tmdbActors = new ArrayList<>(List.of(tmdbActor));

    Actor actor = new Actor("6384","Keanu Reeves","https://image.tmdb.org/t/p/w154/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","actor");
    List<Actor> actors = new ArrayList<>(List.of(actor));


    @Test
    public void getMovieSearchResultByNameTest() {
        //GIVEN
        String name = "The Matrix";
        String url = "http://localhost:" + port + "/api/search/movie/" + name;
        when(tmdbService.getMovieSearchResultByName(name)).thenReturn(tmdbMovies);
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
        when(tmdbService.getActorSearchResultByName(name)).thenReturn(tmdbActors);
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
        when(tmdbService.getActorDetailsById(id)).thenReturn(tmdbActor);
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
        when(tmdbService.getMovieDetailsById(id)).thenReturn(tmdbMovie);
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
        when(tmdbService.getMovieCrewById(id)).thenReturn(tmdbActors);
        //WHEN
        ResponseEntity<Actor[]> response = testRestTemplate.getForEntity(url,Actor[].class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actors.toArray()));
    }


}