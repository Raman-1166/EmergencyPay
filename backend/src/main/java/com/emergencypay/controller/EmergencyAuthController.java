package com.emergencypay.controller;

import com.emergencypay.dto.AuthResponse;
import com.emergencypay.dto.LoginRequest;
import com.emergencypay.dto.RegisterRequest;
import com.emergencypay.model.Role;
import com.emergencypay.model.User;
import com.emergencypay.repository.UserRepository;
import com.emergencypay.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class EmergencyAuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        String aadhaarLast4 = request.getAadhaar().substring(request.getAadhaar().length() - 4);
        String aadhaarHash = hashAadhaar(request.getAadhaar());
        String cardLast4 = request.getCardNumber().substring(request.getCardNumber().length() - 4);

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .aadhaarLast4(aadhaarLast4)
                .aadhaarHash(aadhaarHash)
                .cardLast4(cardLast4)
                .cardExpiry(request.getCardExpiry())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRepository.count() == 0 ? Role.ADMIN : Role.USER)
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwt = jwtProvider.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return ResponseEntity.ok(new AuthResponse(jwt, user.getEmail(), user.getRole().name()));
    }

    private String hashAadhaar(String aadhaar) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(aadhaar.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing Aadhaar", e);
        }
    }
}
