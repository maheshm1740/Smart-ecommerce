package com.javabot.E_commerce.service;

import com.javabot.E_commerce.model.Category;
import com.javabot.E_commerce.model.InteractionLog;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.repository.InteractionRepository;
import com.javabot.E_commerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final InteractionRepository interactionRepository;
    private final ProductRepository productRepository;

    public List<Product> getRecommendationsForUser(User user) {
        // Step 1: Fetch recent interactions
        List<InteractionLog> logs = interactionRepository.findTop10ByUserOrderByTimestampDesc(user);

        if (logs.isEmpty()) {
            return productRepository.findRandomProducts();
        }

        // Step 2: Count categories
        Map<Category, Long> categoryCount = logs.stream()
                .map(log -> log.getProduct().getCategory())
                .collect(Collectors.groupingBy(cat -> cat, Collectors.counting()));

        // Step 3: Sort categories by frequency
        List<Category> topCategories = categoryCount.entrySet().stream()
                .sorted(Map.Entry.<Category, Long>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .limit(2)
                .toList();

        // Step 4: Fetch products from these categories
        return productRepository.findTop10ByCategoryInOrderByPriceAsc(topCategories);
    }
}
