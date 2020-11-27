package de.neuefische.rikardo.dub.model.actor;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.neuefische.rikardo.dub.model.movie.TmdbMovie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TmdbActorMovieCredits {

    @JsonProperty("cast")
    private List<TmdbMovie> movieList;

}
