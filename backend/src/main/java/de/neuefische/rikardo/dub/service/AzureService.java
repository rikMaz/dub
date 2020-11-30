package de.neuefische.rikardo.dub.service;

import com.amazonaws.util.IOUtils;
import de.neuefische.rikardo.dub.model.azure.AzureResult;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

@Service
public class AzureService {

    private final RestTemplate restTemplate = new RestTemplate();


    public String identifySpeaker(MultipartFile file) throws IOException {

        String url = "https://westus.api.cognitive.microsoft.com" +
                "/speaker/identification/v2.0/text-independent/profiles/identifySingleSpeaker" +
                "?profileIds=27bd5dd5-bfa2-45e8-bc5f-07d9aadc8fbc,bd0099d8-2cca-4a9a-9f6a-9f06c65b6e27";


        System.out.println("Test:");
        System.out.println(file.getContentType());

        byte[] bytes = StreamUtils.copyToByteArray(file.getInputStream());

        MultiValueMap<String, Object> bodyMap = new LinkedMultiValueMap<>();
        bodyMap.add("user-file", StreamUtils.copyToByteArray(file.getInputStream()));

        HttpHeaders headers = new HttpHeaders();
        //headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key","211fcf4291f74369a379064d1e270fa0");
        //headers.set("Content-Type","application/json");
        //headers.set("Content-Type","audio/wav");
        HttpEntity<MultiValueMap<String,Object>> requestEntity = new HttpEntity<>(bodyMap,headers);

        ResponseEntity<AzureResult> response = restTemplate.exchange(url,
                    HttpMethod.POST, requestEntity, AzureResult.class);

        System.out.println(response.getBody());

    return "test";
    }
}
