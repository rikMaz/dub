package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorCatch;
import de.neuefische.rikardo.dub.model.actor.ActorSearchResult;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCatch;
import de.neuefische.rikardo.dub.model.movie.MovieCrew;
import de.neuefische.rikardo.dub.model.movie.MovieSearchResult;
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
    private ApiService apiService;

    @Test
    public void getMovieSearchResultByNameTest() {
        //GIVEN
        String url = "http://localhost:" + port + "/api/search/movie/";
        String name = "The Matrix";

        List<MovieCatch> movieCatch = new ArrayList<>(List.of(
                new MovieCatch("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg")
        ));

        List<Movie> movies = new ArrayList<>(List.of(
                new Movie("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg","movie")
        ));

        when(apiService.getMovieSearchResultByName(name)).thenReturn(movieCatch);
        //WHEN
        ResponseEntity<Movie[]> response = testRestTemplate.getForEntity(url + name,Movie[].class);

        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(movies.toArray()));
    }

    @Test
    public void getActorSearchResultByNameTest() {
        //GIVEN
        String url = "http://localhost:" + port + "/api/search/actor/";
        String name = "Keanu Reeves";

        List<ActorCatch> actorCatch = new ArrayList<>(List.of(
                new ActorCatch("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting","Neo")
        ));

        List<Actor> actors = new ArrayList<>(List.of(
                new Actor("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting","Neo")
        ));

        when(apiService.getActorSearchResultByName(name)).thenReturn(actorCatch);
        //WHEN
        ResponseEntity<Actor[]> response = testRestTemplate.getForEntity(url + name,Actor[].class);

        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actors.toArray()));
    }

    @Test
    public void getActorDetailsByIdTest() {
        //GIVEN
        String url = "http://localhost:" + port + "/api/actor/";
        String id = "6384";

        Actor actor = new Actor("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting","Neo");
        ActorCatch actorCatch = new ActorCatch("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting","Neo");

        when(apiService.getActorDetailsById(id)).thenReturn(actorCatch);
        //WHEN
        ResponseEntity<Actor> response = testRestTemplate.getForEntity(url + id,Actor.class);

        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actor));
    }

    @Test
    public void getMovieDetailsByIdTest() {
        //GIVEN
        String url = "http://localhost:" + port + "/api/movie/";
        String id = "603";

        Movie movie = new Movie("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg","movie");
        MovieCatch movieCatch = new MovieCatch("603","The Matrix", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg");

        when(apiService.getMovieDetailsById(id)).thenReturn(movieCatch);
        //WHEN
        ResponseEntity<Movie> response = testRestTemplate.getForEntity(url + id,Movie.class);

        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(movie));
    }

    @Test
    public void getMovieCrewByIdTest() {
        //GIVEN
        String url = "http://localhost:" + port + "/api/movie/";
        String id = "603";

        List<ActorCatch> actorCatch = new ArrayList<>(List.of(
                new ActorCatch("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting","Neo")
        ));

        List<Actor> actors = new ArrayList<>(List.of(
                new Actor("6384","Keanu Reeves","/rRdru6REr9i3WIHv2mntpcgxnoY.jpg","Acting","Neo")
        ));

        when(apiService.getMovieCrewById(id)).thenReturn(actorCatch);
        //WHEN
        ResponseEntity<Actor[]> response = testRestTemplate.getForEntity(url + id + "/crew",Actor[].class);

        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(actors.toArray()));
    }


}