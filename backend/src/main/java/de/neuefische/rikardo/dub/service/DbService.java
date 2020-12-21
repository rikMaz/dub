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

        return voiceActorMongoDb.findAllByName(name)
                .stream()
                .map(voiceActor -> VoiceActorPreview.builder()
                        .id(voiceActor.getId())
                        .name(voiceActor.getName())
                        .image(voiceActor.getImage())
                        .type(voiceActor.getType())
                        .build())
                .collect(Collectors.toList());
    }


    public VoiceActor getVoiceActorById(String id) {
        VoiceActor voiceActor = voiceActorMongoDb.findAllById(id);

        voiceActor.setActors(voiceActor.getActors()
                .stream()
                .map(actorPreview -> actorService.getActorPreviewById(actorPreview.getId()))
                .collect(Collectors.toList()));

        return voiceActor;
    }

    public List<VoiceActor> getAllVoiceActors() {
        return voiceActorMongoDb.findAll();
    }

}
