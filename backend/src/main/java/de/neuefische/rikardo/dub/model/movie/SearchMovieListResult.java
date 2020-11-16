package de.neuefische.rikardo.dub.model.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchMovieListResult {


    @JsonProperty("id")
    private int id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("poster_path")
    private String poster_path;

    /*@JsonProperty("video")
    private Boolean video;

    @JsonProperty("vote_count")
    private int vote_count;

    @JsonProperty("vote_average")
    private int vote_average;

    @JsonProperty("release_date")
    private String release_date;

    @JsonProperty("original_language")
    private String original_language;

    @JsonProperty("original_title")
    private String original_title;

    @JsonProperty("genre_ids")
    private int[] genre_ids;

    @JsonProperty("backdrop_path")
    private String backdrop_path;

    @JsonProperty("adult")
    private Boolean adult;

    @JsonProperty("overview")
    private String overview;*/


}
