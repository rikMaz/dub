package de.neuefische.rikardo.dub.model.actor;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TmdbActorList {

    @JsonProperty("results")
    private List<TmdbActor> actors;

}
