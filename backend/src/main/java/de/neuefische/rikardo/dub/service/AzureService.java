package de.neuefische.rikardo.dub.service;

import com.amazonaws.util.IOUtils;
import de.neuefische.rikardo.dub.model.azure.AzureResult;
import de.neuefische.rikardo.dub.model.azure.IdentifiedProfile;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class AzureService {

    @Value("${ocp.apim.subscription.key:defaultApiKeyPlaceholder}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final DbService dbService;

    public AzureService(DbService dbService) {
        this.dbService = dbService;
    }

    public IdentifiedProfile requestAzureRestApi(MultipartFile file) throws IOException {

        String url = "https://westus.api.cognitive.microsoft.com" +
                "/speaker/identification/v2.0/text-independent/profiles/identifySingleSpeaker" +
                "?profileIds=27bd5dd5-bfa2-45e8-bc5f-07d9aadc8fbc,bd0099d8-2cca-4a9a-9f6a-9f06c65b6e27," +
                "4891277c-d82d-4994-851f-14368c3a0574,df81851d-3399-4455-ba39-5b082fc7e3c1";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key",apiKey);

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(IOUtils.toByteArray(file.getInputStream()),headers);

        ResponseEntity<AzureResult> response = restTemplate.exchange(url,
                    HttpMethod.POST, requestEntity, AzureResult.class);

        System.out.println(response.getBody());

    return response.getBody().getIdentifiedProfile();
    }

    public String identifySpeaker(MultipartFile file) throws IOException {

        IdentifiedProfile identifiedProfile = requestAzureRestApi(file);

        VoiceActor voiceActor = dbService.getVoiceActorById(identifiedProfile.getProfileId());

        return voiceActor.getId();
    }



}
