package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.actor.Actor;
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

    public List<VoiceActor> getAllActors() {
        return voiceActorMongoDb.findAll();
    }

    public VoiceActor getVoiceActorsById(String id) {
        VoiceActor voiceActor = voiceActorMongoDb.findAllById(id);
        List<Actor> actorList = new ArrayList<>();
        for (Actor actor: voiceActor.getActors()) {
            actorList.add(actorService.getActorDetailsById(actor.getId()));
        }
        voiceActor.setActors(actorList);
        return voiceActor;
    }
}
