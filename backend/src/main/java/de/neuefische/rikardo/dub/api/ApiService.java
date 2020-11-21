package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.actor.ApiActor;
import de.neuefische.rikardo.dub.model.actor.ApiActorList;
import de.neuefische.rikardo.dub.model.movie.ApiMovie;
import de.neuefische.rikardo.dub.model.movie.ApiMovieCrew;
import de.neuefische.rikardo.dub.model.movie.ApiMovieList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ApiService {

    @Value("${tmdb.api.key:defaultApiKeyPlaceholder}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<ApiMovie> getMovieSearchResultByName(String name) {
        ResponseEntity<ApiMovieList> response = restTemplate.getForEntity(buildApiUrl(true,false,name,"","movie"), ApiMovieList.class);
        return response.getBody().getMovies();
    }

    public List<ApiActor> getActorSearchResultByName(String name) {
        ResponseEntity<ApiActorList> response = restTemplate.getForEntity(buildApiUrl(true,false,name,"","person"), ApiActorList.class);
        return response.getBody().getActors();
    }

    public ApiActor getActorDetailsById(String id) {
        ResponseEntity<ApiActor> response = restTemplate.getForEntity(buildApiUrl(false,false,"",id,"person"), ApiActor.class);
        return response.getBody();
    }

    public ApiMovie getMovieDetailsById(String id) {
        ResponseEntity<ApiMovie> response = restTemplate.getForEntity(buildApiUrl(false,false,"",id,"movie"), ApiMovie.class);
        return response.getBody();
    }

    public List<ApiActor> getMovieCrewById(String id) {
        ResponseEntity<ApiMovieCrew> response = restTemplate.getForEntity(buildApiUrl(false,true,"",id,"movie"), ApiMovieCrew.class);
        return response.getBody().getMovieCrew();
    }


    public String buildApiUrl(Boolean doSearchByName, Boolean lookingForCrew, String name, String id,String type) {
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
        return apiUrl + type + "/" + id + apiKeyQuery + apiKey;
    }
}
