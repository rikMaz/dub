package de.neuefische.rikardo.dub.model.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TmdbMovie {

    private String id;
    private String title;
    private String poster_path;
    private String overview;
    private String release_date;
    private String runtime;
    private String original_language;
    private String budget;
    private String revenue;
}
