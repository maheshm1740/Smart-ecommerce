package com.javabot.E_commerce.controller;

import com.javabot.E_commerce.dto.product.ProductDto;
import com.javabot.E_commerce.mapper.ProductMapper;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.repository.UserRepository;
import com.javabot.E_commerce.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommendation")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<ProductDto>> recommended(@PathVariable Long userId){
        User user=userRepository.findById(userId).orElseThrow();

        List<Product> products=recommendationService.getRecommendationsForUser(user);
        List<ProductDto> productsRecommended=products.stream()
                .map(ProductMapper::toDTO).toList();

        return ResponseEntity.ok(productsRecommended);
    }
}
