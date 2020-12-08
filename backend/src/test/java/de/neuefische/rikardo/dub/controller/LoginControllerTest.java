package de.neuefische.rikardo.dub.controller;

import de.neuefische.rikardo.dub.db.UserDao;
import de.neuefische.rikardo.dub.dto.LoginDto;
import de.neuefische.rikardo.dub.model.user.dubUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.util.Date;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "jwt.secretkey=somesecrettoken"
})
class LoginControllerTest {

    @LocalServerPort
    private int port;


    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserDao userDao;

    private final String secretKey = "somesecrettoken";

    @BeforeEach
    public void setupUser() {
        userDao.deleteAll();
        String password = new BCryptPasswordEncoder().encode("super-password");
        userDao.save(new dubUser("rikardo", password));
    }

    @Test
    public void loginWithValidCredentialsShouldReturnJwtToken() {

        //GIVEN
        LoginDto loginDto = new LoginDto(
                "rikardo",
                "super-password"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login", loginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        String token = response.getBody();
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

        assertThat(claims.getSubject(), is("rikardo"));
        assertThat(claims.getExpiration().after(new Date()), is(true));

    }

    @Test
    public void loginWithInValidCredentialsShouldReturnForbidden() {

        //GIVEN
        LoginDto loginDto = new LoginDto(
                "rikardo",
                "super-password!"
        );

        //WHEN
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:" + port + "/auth/login", loginDto, String.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));

    }

}