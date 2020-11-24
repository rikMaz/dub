package de.neuefische.rikardo.dub.model.voiceactor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "voiceactor")
public class VoiceActor {
    @Id
    private String id;
    private String name;
    private String image;
    private String birthday;
    private String type;
}
