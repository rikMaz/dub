package de.neuefische.rikardo.dub.db;

import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface VoiceActorMongoDb extends PagingAndSortingRepository<VoiceActor,String> {

    List<VoiceActor> findAllByName(String name);

}
