package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorCatch;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class ActorServiceTest {

    final ApiService apiService = mock(ApiService.class);

    final ActorService actorService = new ActorService(apiService);

    @Test
    @DisplayName("The method should return a valid URL to search for a actor by name")
    void getActorSearchResultByNameTest() {
        //GIVEN
        String name = "Daniel Craig";

        List<ActorCatch> actorCatch = new ArrayList<>(List.of(
                new ActorCatch("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting")
        ));

        List<Actor> actors = new ArrayList<>(List.of(
                new Actor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting")
        ));

        when(apiService.getActorSearchResultByName(name)).thenReturn(actorCatch);
        //WHEN
        List<Actor> result = actorService.getActorSearchResultByName(name);
        //THEN
        assertThat(result,is(actors));
    }

    @Test
    @DisplayName("The method should return a valid URL to get actor details by id")
    void getActorDetailsById() {
        //GIVEN
        String id = "8784";
        Actor actor = new Actor("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting");
        ActorCatch actorCatch = new ActorCatch("6384","Keanu Reeves","/image.jpg","Neo","biography","1964-09-02","Beirut, Lebanon","Acting");
        when(apiService.getActorDetailsById(id)).thenReturn(actorCatch);
        //WHEN
        Actor result = actorService.getActorDetailsById(id);
        //THEN
        assertThat(result,is(actor));
    }
}