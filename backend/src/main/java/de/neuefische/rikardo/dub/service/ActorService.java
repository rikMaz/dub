package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ApiActor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {

    private final ApiService apiService;

    private final String tmdbUrlPath = "https://image.tmdb.org/t/p/w154";

    public ActorService(ApiService apiService) {
        this.apiService = apiService;
    }

    public List<Actor> getActorSearchResultByName(String name) {

        List<Actor> actors = new ArrayList<>();
        List<ApiActor> apiActors = apiService.getActorSearchResultByName(name)
                .stream()
                .filter(item -> item.getProfile_path() != null)
                .filter(item -> item.getKnown_for_department().equals("Acting"))
                .collect(Collectors.toList());

        for (ApiActor apiActor: apiActors) {
            Actor actor = new Actor(
                    apiActor.getId(),
                    apiActor.getName(),
                    tmdbUrlPath + apiActor.getProfile_path(),
                    apiActor.getCharacter(),
                    apiActor.getBiography(),
                    apiActor.getBirthday(),
                    apiActor.getPlace_of_birth(),
                    "actor");
            actors.add(actor);
        }

        return actors;
    }

    public Actor getActorDetailsById(String id) {
        ApiActor apiActor = apiService.getActorDetailsById(id);
        return new Actor(
                apiActor.getId(),
                apiActor.getName(),
                tmdbUrlPath + apiActor.getProfile_path(),
                apiActor.getCharacter(),
                apiActor.getBiography(),
                apiActor.getBirthday(),
                apiActor.getPlace_of_birth(),
                "actor");
    }
}
