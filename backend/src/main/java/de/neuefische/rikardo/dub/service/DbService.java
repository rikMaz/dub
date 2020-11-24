package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbService {

    private final VoiceActorMongoDb voiceActorMongoDb;

    public DbService(VoiceActorMongoDb voiceActorMongoDb) {
        this.voiceActorMongoDb = voiceActorMongoDb;
    }

    public List<VoiceActor> getVoiceActorsByName(String name) {
        return voiceActorMongoDb.findAllByName(name);
    }

    public List<VoiceActor> getAllActors() {
        return voiceActorMongoDb.findAll();
    }
}
