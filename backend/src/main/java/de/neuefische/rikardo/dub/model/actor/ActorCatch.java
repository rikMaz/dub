package de.neuefische.rikardo.dub.model.actor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActorCatch {

    private String id;
    private String name;
    private String profile_path;
    private String biography;
    private String birthday;
    private String place_of_birth;
    private String known_for_department;

}
