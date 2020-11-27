package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DbService {

    private final VoiceActorMongoDb voiceActorMongoDb;
    private final ActorService actorService;

    public DbService(VoiceActorMongoDb voiceActorMongoDb, ActorService actorService) {
        this.voiceActorMongoDb = voiceActorMongoDb;
        this.actorService = actorService;
    }

    public List<VoiceActor> getVoiceActorsByName(String name) {
        return voiceActorMongoDb.findAllByName(name);
    }


    public VoiceActor getVoiceActorById(String id) {
        VoiceActor voiceActor = voiceActorMongoDb.findAllById(id);
        List<ActorPreview> actorPreviews = new ArrayList<>();
        for (ActorPreview actorPreview: voiceActor.getActors()) {
            actorPreviews.add(actorService.getActorPreviewById(actorPreview.getId()));
        }
        voiceActor.setActors(actorPreviews);
        return voiceActor;
    }
}
