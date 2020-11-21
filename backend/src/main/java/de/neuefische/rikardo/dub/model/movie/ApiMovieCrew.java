package de.neuefische.rikardo.dub.model.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.neuefische.rikardo.dub.model.actor.ApiActor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiMovieCrew {

    @JsonProperty("cast")
    private List<ApiActor> movieCrew;
}
