package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.movie.MoviePreview;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActorPreview;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {

    private final TmdbService tmdbService;
    private final MovieService movieService;
    private final VoiceActorMongoDb voiceActorMongoDb;

    private final String tmdbUrlPath = "https://image.tmdb.org/t/p/w500";

    public ActorService(TmdbService tmdbService, MovieService movieService, VoiceActorMongoDb voiceActorMongoDb) {
        this.tmdbService = tmdbService;
        this.movieService = movieService;
        this.voiceActorMongoDb = voiceActorMongoDb;
    }

    public List<ActorPreview> getActorPreviewsByName(String name) {

        return tmdbService.getTmdbActorsByName(name)
                .stream()
                .filter(item -> item.getProfile_path() != null)
                .filter(item -> item.getKnown_for_department().equals("Acting"))
                .map(tmdbActor -> ActorPreview.builder()
                        .id(tmdbActor.getId())
                        .name(tmdbActor.getName())
                        .character(tmdbActor.getCharacter())
                        .image(tmdbUrlPath + tmdbActor.getProfile_path())
                        .type("actor")
                        .build())
                .collect(Collectors.toList());
    }


    public ActorPreview getActorPreviewById(String id) {

        TmdbActor tmdbActor = tmdbService.getTmdbActorById(id);

        return ActorPreview.builder()
                .id(tmdbActor.getId())
                .name(tmdbActor.getName())
                .character(tmdbActor.getCharacter())
                .image(tmdbUrlPath + tmdbActor.getProfile_path())
                .type("actor").build();
    }

    public Actor getActorById(String id) {

        TmdbActor tmdbActor = tmdbService.getTmdbActorById(id);

        return Actor.builder()
                .id(tmdbActor.getId())
                .name(tmdbActor.getName())
                .image(tmdbUrlPath + tmdbActor.getProfile_path())
                .character(tmdbActor.getCharacter())
                .biography(tmdbActor.getBiography())
                .birthday(tmdbActor.getBirthday())
                .placeOfBirth(tmdbActor.getPlace_of_birth())
                .type("actor")
                .movies(movieService.getMoviePreviewsById(id))
                .voiceActors(getVoiceActorPreviewsByIdOfActor(id))
                .build();
    }


    public List<VoiceActorPreview> getVoiceActorPreviewsByIdOfActor(String id) {

        List<VoiceActorPreview> voiceActorPreviews = new ArrayList<>();
        List<VoiceActor> voiceActors = voiceActorMongoDb.findAll();

        for (VoiceActor voiceActor: voiceActors) {

            for (ActorPreview actorPreview: voiceActor.getActors()) {

                if(actorPreview.getId().equals(id)) {
                    voiceActorPreviews.add(VoiceActorPreview.builder()
                            .id(voiceActor.getId())
                            .name(voiceActor.getName())
                            .image(voiceActor.getImage())
                            .type(voiceActor.getType())
                            .build());
                    break;
                }
            }
        }
        return voiceActorPreviews;

    }

}
