package com.emergencypay.repository;

import com.emergencypay.model.SystemConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SystemConfigRepository extends JpaRepository<SystemConfig, Long> {
    Optional<SystemConfig> findFirstByOrderByIdAsc();
}
