package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActorPreview;
import de.neuefische.rikardo.dub.service.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("database")
public class DbController {

    private DbService dbService;

    @Autowired
    public DbController(DbService dbService) {
        this.dbService = dbService;
    }

    @GetMapping("/voiceactor/name/{name}")
    public List<VoiceActorPreview> getVoiceActorPreviewsByName(@PathVariable String name) {
        return dbService.getVoiceActorPreviewsByName(name);
    }

    @GetMapping("/voiceactor/id/{id}")
    public VoiceActor getVoiceActorsById (@PathVariable String id) {
        return dbService.getVoiceActorById(id);
    }
}
