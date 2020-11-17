package de.neuefische.rikardo.dub.model.actor;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Actor {

    private String id;
    private String name;
    @JsonProperty("profile_path")
    private String image_path;
}