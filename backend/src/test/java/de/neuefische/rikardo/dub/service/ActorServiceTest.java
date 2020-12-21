package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.MoviePreview;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActorPreview;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class ActorServiceTest {

    final TmdbService tmdbService = mock(TmdbService.class);
    final MovieService movieService = mock(MovieService.class);
    final VoiceActorMongoDb voiceActorMongoDb = mock(VoiceActorMongoDb.class);

    final ActorService actorService = new ActorService(tmdbService, movieService, voiceActorMongoDb);

    TmdbActor tmdbActor = new TmdbActor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting");
    List<TmdbActor> tmdbActors = new ArrayList<>(List.of(tmdbActor));

    TmdbMovie tmdbMovie = new TmdbMovie("603","The Matrix", "/image.jpg","overview","1999-03-30","136","en","0","0");
    List<TmdbMovie> tmdbMovies = new ArrayList<>(List.of(tmdbMovie));

    MoviePreview moviePreview = new MoviePreview("603","The Matrix", "https://image.tmdb.org/t/p/w500/image.jpg","movie");
    List<MoviePreview> moviePreviews = new ArrayList<>(List.of(moviePreview));

    ActorPreview actorPreview = new ActorPreview("6384","Keanu Reeves","Neo","https://image.tmdb.org/t/p/w500/image.jpg","actor");

    List<ActorPreview> actorPreviews = new ArrayList<>(List.of(
            new ActorPreview("6384","Keanu Reeves","Neo","https://image.tmdb.org/t/p/w500/image.jpg","actor")
    ));

    List<ActorPreview> actorPreviewsWunder = new ArrayList<>(List.of(
            new ActorPreview("19292","Adam Sandler","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor"),
            new ActorPreview("9777","Cuba Gooding Jr.","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor"),
            new ActorPreview("8784","Daniel Craig","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor")
    ));

    List<ActorPreview> actorPreviewsVoelz = new ArrayList<>(List.of(
            new ActorPreview("6384","Keanu Reeves","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor"),
            new ActorPreview("12640","David Duchovny","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor"),
            new ActorPreview("13548","James Spader","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor")
            ));

    List<VoiceActor> voiceActors = new ArrayList<>(List.of(
            new VoiceActor("1","Dietmar Wunder","/dietmar_wunder.jpeg","1965-12-05",actorPreviewsWunder,"voiceactor"),
            new VoiceActor("2","Benjamin Völz","/benjamin_voelz.jpeg","1960-05-13",actorPreviewsVoelz,"voiceactor")
    ));


    List<VoiceActorPreview> voiceActorPreviewVoelz = new ArrayList<>(List.of(
            new VoiceActorPreview("2","Benjamin Völz","/benjamin_voelz.jpeg","voiceactor")
    ));

    List<VoiceActorPreview> voiceActorPreviewWunder  = new ArrayList<>(List.of(
            new VoiceActorPreview("1","Dietmar Wunder","/dietmar_wunder.jpeg","voiceactor")
    ));

    Actor actor = new Actor("6384","Keanu Reeves","https://image.tmdb.org/t/p/w500/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","actor",moviePreviews,voiceActorPreviewVoelz);



    @Test
    @DisplayName("The method should return an actorpreview by name")
    void getActorPreviewsByNameTest() {
        //GIVEN
        String name = "Keanu Reeves";
        when(tmdbService.getTmdbActorsByName(name)).thenReturn(tmdbActors);
        //WHEN
        List<ActorPreview> result = actorService.getActorPreviewsByName(name);
        //THEN
        assertThat(result,is(actorPreviews));
    }

    @Test
    @DisplayName("The method should return an actor by id")
    void getActorById() {
        //GIVEN
        String id = "6384";
        when(tmdbService.getTmdbActorById(id)).thenReturn(tmdbActor);
        when(tmdbService.getTmdbActorMovieCreditsById(id)).thenReturn(tmdbMovies);
        when(movieService.getMoviePreviewsById(id)).thenReturn(moviePreviews);
        when(voiceActorMongoDb.findAll()).thenReturn(voiceActors);
        //WHEN
        Actor result = actorService.getActorById(id);
        //THEN
        assertThat(result,is(actor));
    }

    @Test
    @DisplayName("The method should return an actorpreview by id")
    void getActorPreviewById() {
        //GIVEN
        String id = "6384";
        when(tmdbService.getTmdbActorById(id)).thenReturn(tmdbActor);
        //WHEN
        ActorPreview result = actorService.getActorPreviewById(id);
        //THEN
        assertThat(result,is(actorPreview));
    }

    @Test
    @DisplayName("The method should return a list of voice actor preview by the id of actor")
    void getVoiceActorPreviewsByIdOfActorKeanuReeves() {
        //GIVEN
        String id = "6384";
        when(voiceActorMongoDb.findAll()).thenReturn(voiceActors);
        //WHEN
        List<VoiceActorPreview> result = actorService.getVoiceActorPreviewsByIdOfActor(id);
        //THEN
        assertThat(result,is(voiceActorPreviewVoelz));

    }

    @Test
    @DisplayName("The method should return a list of voice actor preview by the id of actor")
    void getVoiceActorPreviewsByIdOfActorDanielCraig() {
        //GIVEN
        String id = "8784";
        when(voiceActorMongoDb.findAll()).thenReturn(voiceActors);
        //WHEN
        List<VoiceActorPreview> result = actorService.getVoiceActorPreviewsByIdOfActor(id);
        //THEN
        assertThat(result,is(voiceActorPreviewWunder));

    }


}