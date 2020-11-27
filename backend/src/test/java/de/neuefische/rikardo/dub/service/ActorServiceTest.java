package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.MoviePreview;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class ActorServiceTest {

    final TmdbService tmdbService = mock(TmdbService.class);

    final ActorService actorService = new ActorService(tmdbService);

    TmdbActor tmdbActor = new TmdbActor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting");
    List<TmdbActor> tmdbActors = new ArrayList<>(List.of(tmdbActor));

    TmdbMovie tmdbMovie = new TmdbMovie("603","The Matrix", "/image.jpg","overview","1999-03-30","136","en","0","0");
    List<TmdbMovie> tmdbMovies = new ArrayList<>(List.of(tmdbMovie));

    MoviePreview moviePreview = new MoviePreview("603","The Matrix", "https://image.tmdb.org/t/p/w154/image.jpg","movie");
    List<MoviePreview> moviePreviews = new ArrayList<>(List.of(moviePreview));

    Actor actor = new Actor("6384","Keanu Reeves","https://image.tmdb.org/t/p/w154/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","actor",moviePreviews);

    ActorPreview actorPreview = new ActorPreview("6384","Keanu Reeves","https://image.tmdb.org/t/p/w154/image.jpg","actor");
    List<ActorPreview> actorPreviews = new ArrayList<>(List.of(actorPreview));


    @Test
    @DisplayName("The method should return a valid URL to search for a actor by name")
    void getActorPreviewsByNameTest() {
        //GIVEN
        String name = "Daniel Craig";
        when(tmdbService.getTmdbActorsByName(name)).thenReturn(tmdbActors);
        //WHEN
        List<ActorPreview> result = actorService.getActorPreviewsByName(name);
        //THEN
        assertThat(result,is(actorPreviews));
    }

    @Test
    @DisplayName("The method should return a valid URL to get actor details by id")
    void getActorById() {
        //GIVEN
        String id = "8784";
        when(tmdbService.getTmdbActorById(id)).thenReturn(tmdbActor);
        when(tmdbService.getTmdbActorMovieCreditsById(id)).thenReturn(tmdbMovies);
        //WHEN
        Actor result = actorService.getActorById(id);
        //THEN
        assertThat(result,is(actor));
    }

    @Test
    @DisplayName("The method should return a valid URL to get actorpreview by id")
    void getActorPreviewById() {
        //GIVEN
        String id = "8784";
        when(tmdbService.getTmdbActorById(id)).thenReturn(tmdbActor);
        //WHEN
        ActorPreview result = actorService.getActorPreviewById(id);
        //THEN
        assertThat(result,is(actorPreview));
    }


}