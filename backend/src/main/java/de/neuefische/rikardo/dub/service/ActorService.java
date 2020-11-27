package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {

    private final TmdbService tmdbService;

    private final String tmdbUrlPath = "https://image.tmdb.org/t/p/w154";

    public ActorService(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    public List<Actor> getActorSearchResultByName(String name) {

        List<Actor> actors = new ArrayList<>();
        List<TmdbActor> tmdbActors = tmdbService.getActorSearchResultByName(name)
                .stream()
                .filter(item -> item.getProfile_path() != null)
                .filter(item -> item.getKnown_for_department().equals("Acting"))
                .collect(Collectors.toList());

        for (TmdbActor tmdbActor : tmdbActors) {
            Actor actor = new Actor(
                    tmdbActor.getId(),
                    tmdbActor.getName(),
                    tmdbUrlPath + tmdbActor.getProfile_path(),
                    tmdbActor.getCharacter(),
                    tmdbActor.getBiography(),
                    tmdbActor.getBirthday(),
                    tmdbActor.getPlace_of_birth(),
                    "actor");
            actors.add(actor);
        }

        return actors;
    }

    public Actor getActorDetailsById(String id) {
        TmdbActor tmdbActor = tmdbService.getActorDetailsById(id);
        return new Actor(
                tmdbActor.getId(),
                tmdbActor.getName(),
                tmdbUrlPath + tmdbActor.getProfile_path(),
                tmdbActor.getCharacter(),
                tmdbActor.getBiography(),
                tmdbActor.getBirthday(),
                tmdbActor.getPlace_of_birth(),
                "actor");
    }
}
