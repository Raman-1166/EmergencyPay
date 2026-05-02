package com.emergencypay.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "system_configs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double minDeposit;

    @Column(nullable = false)
    private Double serviceFee;

    @Column(nullable = false)
    private Double dailySpendLimit;

    @Column(nullable = false)
    private Double requestIncrement;
}
