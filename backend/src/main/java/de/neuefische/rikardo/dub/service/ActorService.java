package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.api.ApiService;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorCatch;
import de.neuefische.rikardo.dub.model.actor.ActorSearchResult;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCatch;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {

    private final ApiService apiService;

    public ActorService(ApiService apiService) {
        this.apiService = apiService;
    }

    public List<Actor> getActorSearchResultByName(String name) {

        List<Actor> actors = new ArrayList<>();
        for (ActorCatch item: apiService.getActorSearchResultByName(name)) {
            Actor actor = new Actor(item.getId(),item.getName(),item.getProfile_path(),item.getKnown_for_department());
            actors.add(actor);
        }

        return actors.stream()
                .filter(item -> item.getImage() != null)
                .filter(item -> item.getType() == "Acting")
                .collect(Collectors.toList());
    }

    public Actor getActorDetailsById(String id) {
        return apiService.getActorDetailsById(id);
    }
}
