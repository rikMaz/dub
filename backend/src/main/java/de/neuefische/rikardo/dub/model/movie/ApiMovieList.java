package de.neuefische.rikardo.dub.model.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiMovieList {

    @JsonProperty("results")
    private List<ApiMovie> movies;

}
