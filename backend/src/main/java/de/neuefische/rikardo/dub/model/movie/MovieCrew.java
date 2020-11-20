package de.neuefische.rikardo.dub.model.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.neuefische.rikardo.dub.model.actor.ActorCatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieCrew {

    @JsonProperty("cast")
    private List<ActorCatch> movieCrew;
}
