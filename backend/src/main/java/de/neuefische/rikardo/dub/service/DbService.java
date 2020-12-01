package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActorPreview;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DbService {

    private final VoiceActorMongoDb voiceActorMongoDb;
    private final ActorService actorService;

    public DbService(VoiceActorMongoDb voiceActorMongoDb, ActorService actorService) {
        this.voiceActorMongoDb = voiceActorMongoDb;
        this.actorService = actorService;
    }

    public List<VoiceActorPreview> getVoiceActorPreviewsByName(String name) {

        List<VoiceActorPreview> voiceActorPreviews = new ArrayList<>();
        List<VoiceActor> voiceActors = voiceActorMongoDb.findAllByName(name);

        for (VoiceActor voiceActor : voiceActors) {
            VoiceActorPreview voiceActorPreview = new VoiceActorPreview(
                    voiceActor.getId(),
                    voiceActor.getName(),
                    voiceActor.getImage(),
                    voiceActor.getType());
            voiceActorPreviews.add(voiceActorPreview);
        }
        return voiceActorPreviews;
    }

    public VoiceActorPreview getVoiceActorPreviewById(String id) {
        VoiceActor voiceActor = voiceActorMongoDb.findAllById(id);
        return new VoiceActorPreview(
                voiceActor.getId(),
                voiceActor.getName(),
                voiceActor.getImage(),
                voiceActor.getType());
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

    public List<VoiceActor> getAllVoiceActors() {
        return voiceActorMongoDb.findAll();
    }

}
