package com.emergencypay.controller;

import com.emergencypay.model.SystemConfig;
import com.emergencypay.repository.SystemConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*")
public class SystemConfigController {

    @Autowired
    private SystemConfigRepository configRepository;

    @GetMapping
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
}
