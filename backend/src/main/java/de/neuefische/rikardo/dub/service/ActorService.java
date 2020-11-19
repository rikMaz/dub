package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorSearchResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {

    private final ApiService apiService;

    public ActorService(ApiService apiService) {
        this.apiService = apiService;
    }

    public List<Actor> getActorSearchResultByName(String name) {
        return apiService.getActorSearchResultByName(name).stream()
                .filter(item -> item.getProfile_path() != null)
                .collect(Collectors.toList());
    }

    public Actor getActorDetailsById(String id) {
        return apiService.getActorDetailsById(id);
    }
}
