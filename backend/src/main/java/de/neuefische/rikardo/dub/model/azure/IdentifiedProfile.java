package de.neuefische.rikardo.dub.model.azure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdentifiedProfile {

    private String profileId;
    private double score;

}
