package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.actor.ActorSearchList;
import de.neuefische.rikardo.dub.model.movie.MovieSearchList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    @Value("${tmdb.api.key:defaultApiKeyPlaceholder}")
    private String apiKey;

    private RestTemplate restTemplate = new RestTemplate();

    public MovieSearchList getMovieSearchListByName(String name) {
        ResponseEntity<MovieSearchList> response = restTemplate.getForEntity(buildApiUrlToSearchByName(name,"movie"), MovieSearchList.class);
        return response.getBody();
    }

    public ActorSearchList getActorSearchListByName(String name) {
        ResponseEntity<ActorSearchList> response = restTemplate.getForEntity(buildApiUrlToSearchByName(name,"person"), ActorSearchList.class);
        return response.getBody();
    }

    public String buildApiUrlToSearchByName(String name,String type) {
        name = name.toLowerCase();
        String apiUrl = "https://api.themoviedb.org/3/search/";
        String apiKeyQuery = "?api_key=";
        String nameQuery = "&query=";
        return apiUrl + type + apiKeyQuery + apiKey + nameQuery + name;
    }

}
