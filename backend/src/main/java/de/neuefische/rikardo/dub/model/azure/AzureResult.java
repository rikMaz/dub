package de.neuefische.rikardo.dub.model.azure;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AzureResult {

    private IdentifiedProfile identifiedProfile;
    private List<IdentifiedProfile> profilesRanking;

}
