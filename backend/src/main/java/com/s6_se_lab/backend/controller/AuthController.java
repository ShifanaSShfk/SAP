package com.s6_se_lab.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.s6_se_lab.backend.model.User;
import com.s6_se_lab.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Value;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.sql.Date;
import java.util.Collections;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${jwt.secret}")
    private String secretKey;


    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String id = request.get("id");
        String password = request.get("password");

        User user = userRepository.findByIdAndPassword(id, password);
        if (user != null) {
            return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "role", user.getRole(),
                "email", user.getEmail()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test API is working!");
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

                String userId = claims.get("id", String.class);
                String role = claims.get("role", String.class);

                return ResponseEntity.ok(Map.of("userId", userId, "role", role));
            } catch (JwtException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid token"));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Missing token"));
    }

    @PostMapping("/google-login")
public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
    String token = body.get("token");

    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            GsonFactory.getDefaultInstance()
    )
    .setAudience(Collections.singletonList("1046114809183-eguhc97gfnar5dtfm64tmsppjsnhtvgq.apps.googleusercontent.com"))
    .build();

    try {
        GoogleIdToken idToken = verifier.verify(token);
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            String email = payload.getEmail();

            // Find or create user
            User user = userRepository.findByEmail(email);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setRole("student");
                userRepository.save(user);
            }

            // Convert secret to Key
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

            // Generate JWT
            String jwt = Jwts.builder()
                    .claim("id", user.getId())
                    .claim("role", user.getRole())
                    .setIssuedAt(new Date(0))
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                    .signWith(SignatureAlgorithm.HS256, key)
                    .compact();

            return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "role", user.getRole(),
                    "userId", user.getId()
            ));
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Google login failed"));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token"));
}

@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    String newPassword = request.get("newPassword");

    User user = userRepository.findByEmail(email);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // If you use encryption (recommended):
    // String encodedPassword = passwordEncoder.encode(newPassword);
    user.setPassword(newPassword);

    // If not using encoding, just:
    // user.setPassword(newPassword);

    userRepository.save(user);
    return ResponseEntity.ok("Password updated");
}


    
}