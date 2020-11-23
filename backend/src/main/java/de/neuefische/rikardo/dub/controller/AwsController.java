package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.service.AwsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("aws")
public class AwsController {
    private final AwsService awsService;

    @Autowired
    public AwsController(AwsService awsService) {
        this.awsService = awsService;
    }

    @PostMapping("/image")
    public String uploadImage(@RequestParam("image") MultipartFile file) throws IOException, InterruptedException {
        System.out.println("File Size: " + file.getSize());
        System.out.println("Content Type: " + file.getContentType());
        System.out.println("Original Filename: " + file.getOriginalFilename());
        return awsService.upload(file);
    }
}
