package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.actor.Actor;
import de.neuefische.rikardo.dub.model.actor.ActorCatch;
import de.neuefische.rikardo.dub.model.actor.ActorSearchResult;
import de.neuefische.rikardo.dub.model.movie.Movie;
import de.neuefische.rikardo.dub.model.movie.MovieCatch;
import de.neuefische.rikardo.dub.model.movie.MovieCrew;
import de.neuefische.rikardo.dub.model.movie.MovieSearchResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApiService {

    @Value("${tmdb.api.key:defaultApiKeyPlaceholder}")
    private String apiKey;

    private RestTemplate restTemplate = new RestTemplate();

    public List<MovieCatch> getMovieSearchResultByName(String name) {
        ResponseEntity<MovieSearchResult> response = restTemplate.getForEntity(buildApiUrl(true,false,name,"","movie"), MovieSearchResult.class);
        return response.getBody().getMovies();
    }

    public List<ActorCatch> getActorSearchResultByName(String name) {
        ResponseEntity<ActorSearchResult> response = restTemplate.getForEntity(buildApiUrl(true,false,name,"","person"), ActorSearchResult.class);
        return response.getBody().getActors();
    }

    public ActorCatch getActorDetailsById(String id) {
        ResponseEntity<ActorCatch> response = restTemplate.getForEntity(buildApiUrl(false,false,"",id,"person"), ActorCatch.class);
        return response.getBody();
    }

    public MovieCatch getMovieDetailsById(String id) {
        ResponseEntity<MovieCatch> response = restTemplate.getForEntity(buildApiUrl(false,false,"",id,"movie"), MovieCatch.class);
        return response.getBody();
    }

    public MovieCrew getMovieCrewById(String id) {
        ResponseEntity<MovieCrew> response = restTemplate.getForEntity(buildApiUrl(false,true,"",id,"movie"), MovieCrew.class);
        return response.getBody();
    }


    public String buildApiUrl(Boolean doSearch, Boolean lookingForCrew, String name, String id,String type) {
        String apiUrl = "https://api.themoviedb.org/3/";
        String apiKeyQuery = "?api_key=";
        String nameQuery = "&query=";
        String crewQuery = "/credits";
        if (doSearch) {
            return apiUrl + "search" + "/" + type + apiKeyQuery + apiKey + nameQuery + name.toLowerCase();
        }
        if (lookingForCrew) {
            return apiUrl + type + "/" + id + crewQuery + apiKeyQuery + apiKey;
        }
        return apiUrl + type + "/" + id + apiKeyQuery + apiKey;
    }
}
