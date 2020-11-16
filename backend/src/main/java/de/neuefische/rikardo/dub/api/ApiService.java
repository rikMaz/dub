package de.neuefische.rikardo.dub.api;

import de.neuefische.rikardo.dub.model.movie.SearchMovieList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    public SearchMovieList searchMovieDetailsByName(String movieName) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<SearchMovieList> response = restTemplate.getForEntity(buildApiUrlToSearchMovieDetailsByName(movieName), SearchMovieList.class);
        return response.getBody();
    }

    public String buildApiUrlToSearchMovieDetailsByName(String movieName) {
        String name = movieName.toLowerCase();
        String apiUrl = "https://api.themoviedb.org/3/search/";
        String type = "movie";
        String apiKeyQuery = "?api_key=";
        String nameQuery = "&query=";

        apiUrl = apiUrl + type + apiKeyQuery + apiKey + nameQuery + name;

        return apiUrl;
    }

}
