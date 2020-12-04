package de.neuefische.rikardo.dub.controller;


import de.neuefische.rikardo.dub.model.azure.AzureResult;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.service.AzureService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("azure")
public class AzureController {

    private final AzureService azureService;

    public AzureController(AzureService azureService) {
        this.azureService = azureService;
    }

    @PostMapping("/audio")
    public String uploadAudio(@RequestParam(value = "audio") MultipartFile file) throws IOException, InterruptedException {
        System.out.println("File Size: " + file.getSize());
        System.out.println("Content Type: " + file.getContentType());
        System.out.println("Original Filename: " + file.getOriginalFilename());
        return azureService.identifySpeaker(file);
    }

}
