package de.neuefische.rikardo.dub.model.voiceactor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoiceActorPreview {

    private String id;
    private String name;
    private String image;
    private String type;

}
