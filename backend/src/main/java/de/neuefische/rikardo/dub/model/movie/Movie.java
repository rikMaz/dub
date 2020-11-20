package de.neuefische.rikardo.dub.model.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    private String id;
    private String name;
    private String image;
    private String type;
}
