package de.neuefische.rikardo.dub.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtUtils {

    @Value("${jwt.secretkey}")
    private String key;

    public String createJwtToken(String username, Map<String,Object> claims){
        return Jwts.builder()
                .setClaims(claims) // data in token
                .setSubject(username) // username -> subject
                .setIssuedAt(Date.from(Instant.now())) // issued now
                .setExpiration(Date.from(Instant.now().plus(Duration.ofHours(2)))) // expires in 2 hours
                .signWith(SignatureAlgorithm.HS512,key) // sign token with algorithm and key
                .compact();
    }

    public Claims parseToken(String token){
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    public boolean isExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }
}
