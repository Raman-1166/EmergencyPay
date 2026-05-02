package com.emergencypay.controller;

import com.emergencypay.model.SystemConfig;
import com.emergencypay.model.User;
import com.emergencypay.repository.SystemConfigRepository;
import com.emergencypay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class EmergencyAdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SystemConfigRepository configRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/config")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemConfig> getConfig() {
        SystemConfig config = configRepository.findFirstByOrderByIdAsc()
                .orElseGet(() -> {
                    SystemConfig defaultConfig = SystemConfig.builder()
                            .minDeposit(500.0)
                            .serviceFee(5.0)
                            .dailySpendLimit(50.0)
                            .requestIncrement(50.0)
                            .build();
                    return configRepository.save(defaultConfig);
                });
        return ResponseEntity.ok(config);
    }

    @PutMapping("/config")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemConfig> updateConfig(@RequestBody SystemConfig newConfig) {
        SystemConfig config = configRepository.findFirstByOrderByIdAsc()
                .orElseGet(() -> SystemConfig.builder().build());
        
        config.setMinDeposit(newConfig.getMinDeposit());
        config.setServiceFee(newConfig.getServiceFee());
        config.setDailySpendLimit(newConfig.getDailySpendLimit());
        config.setRequestIncrement(newConfig.getRequestIncrement());
        
        return ResponseEntity.ok(configRepository.save(config));
    }
}
