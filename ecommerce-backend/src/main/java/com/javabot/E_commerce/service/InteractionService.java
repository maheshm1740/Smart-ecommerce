package com.javabot.E_commerce.service;

import com.javabot.E_commerce.model.InteractionLog;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.repository.InteractionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InteractionService {

    private final InteractionRepository interactionRepository;

    public void logInteraction(User user, Product product, String actionType){
        InteractionLog log=new InteractionLog();
        log.setUser(user);
        log.setProduct(product);
        log.setTimestamp(LocalDateTime.now());
        log.setActionType(actionType);
        interactionRepository.save(log);
    }
}
