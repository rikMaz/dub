package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorSearchResult;
import org.springframework.stereotype.Service;

@Service
public class ActorService {

    private final ApiService apiService;

    public ActorService(ApiService apiService) {
        this.apiService = apiService;
    }

    public ActorSearchResult getActorSearchResultByName(String name) {
        return apiService.getActorSearchResultByName(name);
    }

    public Actor getActorDetailsById(String id) {
        return apiService.getActorDetailsById(id);
    }
}
