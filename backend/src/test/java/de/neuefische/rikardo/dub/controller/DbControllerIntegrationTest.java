package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.db.UserDao;
import de.neuefische.rikardo.dub.db.VoiceActorMongoDb;
import de.neuefische.rikardo.dub.dto.LoginDto;
import de.neuefische.rikardo.dub.model.actor.ActorPreview;
import de.neuefische.rikardo.dub.model.user.dubUser;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActor;
import de.neuefische.rikardo.dub.model.voiceactor.VoiceActorPreview;
import de.neuefische.rikardo.dub.service.ActorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {"jwt.secretkey=somesecrettoken"})
class DbControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @MockBean
    private VoiceActorMongoDb voiceActorMongoDb;

    @MockBean
    private ActorService actorService;

    @Autowired
    private UserDao userDao;

    @BeforeEach
    public void setupDb() {

        String password = new BCryptPasswordEncoder().encode("super-password");
        userDao.save(new dubUser("rikardo", password));

    }

    private String login(){
        ResponseEntity<String> response = testRestTemplate.postForEntity("http://localhost:" + port + "/auth/login", new LoginDto(
                "rikardo",
                "super-password"
        ), String.class);

        return response.getBody();
    }

    private <T> HttpEntity<T> getValidAuthorizationEntity(T data) {
        String token = login();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return new HttpEntity<T>(data,headers);
    }

    VoiceActorPreview voiceActorPreview = new VoiceActorPreview("1","Dietmar Wunder","/dietmar_wunder.jpeg","voiceactor");
    List<VoiceActorPreview> voiceActorPreviews = new ArrayList<>(List.of(voiceActorPreview));

    ActorPreview actorPreview = new ActorPreview("19292","Adam Sandler","placeholder","https://image.tmdb.org/t/p/w500/image.jpg","actor");
    List<ActorPreview> actorPreviewsWunder = new ArrayList<>(List.of(actorPreview));

    VoiceActor voiceActor = new VoiceActor("1","Dietmar Wunder","/dietmar_wunder.jpeg","1965-12-05",actorPreviewsWunder,"voiceactor");
    List<VoiceActor> voiceActors = new ArrayList<>(List.of(voiceActor));


    @Test
    public void getVoiceActorPreviewsByNameTest() {
        //GIVEN
        String name = "Dietmar Wunder";
        String url = "http://localhost:" + port + "/database/voiceactor/name/" + name;
        when(voiceActorMongoDb.findAllByName(name)).thenReturn(voiceActors);
        //WHEN
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<VoiceActorPreview[]> response = testRestTemplate.exchange(url, HttpMethod.GET, entity, VoiceActorPreview[].class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(voiceActorPreviews.toArray()));
    }

    @Test
    public void getVoiceActorsByIdTest() {
        //GIVEN
        String id = "1";
        String url = "http://localhost:" + port + "/database/voiceactor/id/" + id;
        when(voiceActorMongoDb.findAllById(id)).thenReturn(voiceActor);
        when(actorService.getActorPreviewById(id)).thenReturn(actorPreview);
        //WHEN
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<VoiceActor> response = testRestTemplate.exchange(url, HttpMethod.GET, entity, VoiceActor.class);
        //THEN
        assertThat(response.getStatusCode(),is(HttpStatus.OK));
        assertThat(response.getBody(),is(voiceActor));
    }


}