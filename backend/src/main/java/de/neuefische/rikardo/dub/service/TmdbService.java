package de.neuefische.rikardo.dub.service;

import de.neuefische.rikardo.dub.model.actor.TmdbActor;
import de.neuefische.rikardo.dub.model.actor.TmdbActorList;
import de.neuefische.rikardo.dub.model.actor.TmdbActorMovieCredits;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import de.neuefische.rikardo.dub.model.movie.TmdbMovieCrew;
import de.neuefische.rikardo.dub.model.movie.TmdbMovieList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class TmdbService {

    @Value("${tmdb.api.key:defaultApiKeyPlaceholder}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<TmdbMovie> getMovieSearchResultByName(String name) {
        ResponseEntity<TmdbMovieList> response = restTemplate.getForEntity(buildApiUrl(true,false,false,name,"","movie"), TmdbMovieList.class);
        return response.getBody().getMovies();
    }

    public List<TmdbActor> getActorSearchResultByName(String name) {
        ResponseEntity<TmdbActorList> response = restTemplate.getForEntity(buildApiUrl(true,false,false,name,"","person"), TmdbActorList.class);
        return response.getBody().getActors();
    }

    public TmdbActor getActorDetailsById(String id) {
        ResponseEntity<TmdbActor> response = restTemplate.getForEntity(buildApiUrl(false,false,false,"",id,"person"), TmdbActor.class);
        return response.getBody();
    }

    public List<TmdbMovie> getActorMovieCreditsById(String id) {
        ResponseEntity<TmdbActorMovieCredits> response = restTemplate.getForEntity(buildApiUrl(false,false,true,"",id,"person"), TmdbActorMovieCredits.class);
        return response.getBody().getMovieList();
    }

    public TmdbMovie getMovieDetailsById(String id) {
        ResponseEntity<TmdbMovie> response = restTemplate.getForEntity(buildApiUrl(false,false,false,"",id,"movie"), TmdbMovie.class);
        return response.getBody();
    }

    public List<TmdbActor> getMovieCrewById(String id) {
        ResponseEntity<TmdbMovieCrew> response = restTemplate.getForEntity(buildApiUrl(false,true,false,"",id,"movie"), TmdbMovieCrew.class);
        return response.getBody().getMovieCrew();
    }


    public String buildApiUrl(Boolean doSearchByName, Boolean lookingForCrew, Boolean lookingForMovieCredits, String name, String id,String type) {
        String apiUrl = "https://api.themoviedb.org/3/";
        String apiKeyQuery = "?api_key=";
        String nameQuery = "&query=";
        String crewQuery = "/credits";
        if (doSearchByName) {
            return apiUrl + "search" + "/" + type + apiKeyQuery + apiKey + nameQuery + name.toLowerCase();
        }
        if (lookingForCrew) {
            return apiUrl + type + "/" + id + crewQuery + apiKeyQuery + apiKey;
        }
        if (lookingForMovieCredits) {
            return apiUrl + type + "/" + id + "/movie_credits" + apiKeyQuery + apiKey;
        }
        return apiUrl + type + "/" + id + apiKeyQuery + apiKey;
    }
}