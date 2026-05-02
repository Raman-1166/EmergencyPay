package com.emergencypay.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 10)
    private String mobile;

    // Security: Only store last 4 digits of Aadhaar
    @Column(nullable = false, length = 4)
    private String aadhaarLast4;

    // Security: Hashed version of full Aadhaar for verification if needed
    @Column(nullable = false)
    private String aadhaarHash;

    // Security: Tokenized/Masked Card details
    @Column(nullable = false, length = 4)
    private String cardLast4;

    @Column(nullable = false)
    private String cardExpiry;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
