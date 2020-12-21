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
    private final VoiceActorMongoDb voiceActorMongoDb;

    private final String tmdbUrlPath = "https://image.tmdb.org/t/p/w500";

    public ActorService(TmdbService tmdbService, VoiceActorMongoDb voiceActorMongoDb) {
        this.tmdbService = tmdbService;
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
        return new ActorPreview(
                        tmdbActor.getId(),
                        tmdbActor.getName(),
                        tmdbActor.getCharacter(),
                    tmdbUrlPath + tmdbActor.getProfile_path(),
                    "actor");
    }

    public Actor getActorById(String id) {
        TmdbActor tmdbActor = tmdbService.getTmdbActorById(id);

        List<VoiceActorPreview> voiceActorPreviews = getVoiceActorPreviewsByIdOfActor(id);

        List<MoviePreview> moviePreviews = new ArrayList<>();
        List<TmdbMovie> tmdbMovies = tmdbService.getTmdbActorMovieCreditsById(id)
                .stream()
                .filter(item -> item.getPoster_path() != null)
                .collect(Collectors.toList());

        for (TmdbMovie tmdbMovie : tmdbMovies) {
            MoviePreview moviePreview = new MoviePreview(
                    tmdbMovie.getId(),
                    tmdbMovie.getTitle(),
                    tmdbUrlPath + tmdbMovie.getPoster_path(),
                    "movie");
            moviePreviews.add(moviePreview);
        }


        return new Actor(
                tmdbActor.getId(),
                tmdbActor.getName(),
                tmdbUrlPath + tmdbActor.getProfile_path(),
                tmdbActor.getCharacter(),
                tmdbActor.getBiography(),
                tmdbActor.getBirthday(),
                tmdbActor.getPlace_of_birth(),
                "actor",
                moviePreviews,
                voiceActorPreviews);
    }


    public List<VoiceActorPreview> getVoiceActorPreviewsByIdOfActor(String id) {

        List<VoiceActorPreview> voiceActorPreviews = new ArrayList<>();
        List<VoiceActor> voiceActors = voiceActorMongoDb.findAll();

        for (VoiceActor voiceActor: voiceActors) {

            for (ActorPreview actorPreview: voiceActor.getActors()) {

                if(actorPreview.getId().equals(id)) {
                    VoiceActorPreview voiceActorPreview = new VoiceActorPreview(
                            voiceActor.getId(),
                            voiceActor.getName(),
                            voiceActor.getImage(),
                            voiceActor.getType());
                    voiceActorPreviews.add(voiceActorPreview);
                    break;
                }
            }
        }
        return voiceActorPreviews;
    }

}
