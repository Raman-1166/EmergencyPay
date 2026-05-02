package com.emergencypay.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String mobile;
    private String aadhaar;
    private String cardNumber;
    private String cardExpiry;
    private String password;
}
