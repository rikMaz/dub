package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.ActorSearchList;
import org.springframework.stereotype.Service;

@Service
public class ActorService {

    private final ApiService apiService;

    public ActorService(ApiService apiService) {
        this.apiService = apiService;
    }

    public ActorSearchList getActorSearchListByName(String name) {
        return apiService.getActorSearchListByName(name);
    }
}
