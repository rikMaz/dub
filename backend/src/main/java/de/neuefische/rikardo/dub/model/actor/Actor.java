package de.neuefische.rikardo.dub.model.actor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Actor {

    private String id;
    private String name;
    private String image;
    private String character;
    private String biography;
    private String birthday;
    private String placeOfBirth;
    private String type;
}
