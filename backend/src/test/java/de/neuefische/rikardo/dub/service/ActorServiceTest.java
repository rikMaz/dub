package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorSearchResult;
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

        List<Actor> actors = new ArrayList<>(List.of(
                new Actor("8784","Daniel Craig","/image.jpg")
        ));

        when(apiService.getActorSearchResultByName(name)).thenReturn(actors);
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
        Actor actor = new Actor("8784","Daniel Craig","/image.jpg");
        when(apiService.getActorDetailsById(id)).thenReturn(actor);
        //WHEN
        Actor result = actorService.getActorDetailsById(id);
        //THEN
        assertThat(result,is(actor));
    }
}