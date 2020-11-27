package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActorPreview;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class DbServiceTest {

    final ActorService actorService = mock(ActorService.class);
    final VoiceActorMongoDb voiceActorMongoDb = mock(VoiceActorMongoDb.class);

    final DbService dbService = new DbService(voiceActorMongoDb,actorService);

    ActorPreview actorPreview = new ActorPreview("8784","Daniel Craig","/image.jpg","actor");
    List<ActorPreview> actorPreviews = new ArrayList<>(List.of(actorPreview));

    VoiceActor voiceActor = new VoiceActor("1","Dietmar Wunder","/dietmar_wunder.jpeg","1965-12-05",actorPreviews,"voiceactor");
    List<VoiceActor> voiceActors = new ArrayList<>(List.of(voiceActor));

    VoiceActorPreview voiceActorPreview = new VoiceActorPreview("1","Dietmar Wunder","/dietmar_wunder.jpeg","voiceactor");
    List<VoiceActorPreview> voiceActorPreviews = new ArrayList<>(List.of(voiceActorPreview));

    @Test
    @DisplayName("The method should return a list of voice actor preview by name")
    void getVoiceActorPreviewsByNameTest(){
        //GIVEN
        String name = "Dietmar Wunder";
        when(voiceActorMongoDb.findAllByName(name)).thenReturn(voiceActors);
        //WHEN
        List<VoiceActorPreview> result = dbService.getVoiceActorPreviewsByName(name);
        //THEN
        assertThat(result,is(voiceActorPreviews));
    }

    @Test
    @DisplayName("The method should return a voice actor by id")
    void getVoiceActorByIdTest(){
        //GIVEN
        String id = "1";
        when(voiceActorMongoDb.findAllById(id)).thenReturn(voiceActor);
        //WHEN
        VoiceActor result = dbService.getVoiceActorById(id);
        //THEN
        assertThat(result,is(voiceActor));
    }


}