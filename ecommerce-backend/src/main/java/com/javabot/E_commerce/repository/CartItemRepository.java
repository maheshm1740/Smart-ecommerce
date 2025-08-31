package com.javabot.E_commerce.repository;

import com.javabot.E_commerce.model.CartItem;
import com.javabot.E_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProductId(User user, Long productId);
    void deleteByUserAndProductId(User user, Long productId);
}
