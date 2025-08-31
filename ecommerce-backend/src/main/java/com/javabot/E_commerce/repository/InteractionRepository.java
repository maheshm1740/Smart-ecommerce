package com.javabot.E_commerce.repository;

import com.javabot.E_commerce.model.InteractionLog;
import com.javabot.E_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InteractionRepository extends JpaRepository<InteractionLog, Long> {
    List<InteractionLog> findTop10ByUserOrderByTimestampDesc(User user);
}
