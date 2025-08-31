//package com.javabot.E_commerce.config;
//
//import com.javabot.E_commerce.model.Category;
//import com.javabot.E_commerce.model.Product;
//import com.javabot.E_commerce.repository.CategoryRepository;
//import com.javabot.E_commerce.repository.ProductRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class DataInitializer {
//
//    @Bean
//    CommandLineRunner initDatabase(ProductRepository productRepository, CategoryRepository categoryRepository) {
//        return args -> {
//            // Ensure categories exist or create them
//            Category electronics = categoryRepository.findByNameIgnoreCase("Electronics")
//                    .orElseGet(() -> categoryRepository.save(new Category("Electronics")));
//
//            Category footwear = categoryRepository.findByNameIgnoreCase("Footwear")
//                    .orElseGet(() -> categoryRepository.save(new Category("Footwear")));
//
//            // Only insert products if they don't already exist (optional safeguard)
//            if (productRepository.count() == 0) {
//                Product p1 = new Product("Smartphone", "Latest Android phone", electronics, 29999.0, 50, "https://example.com/image1.jpg");
//                Product p2 = new Product("Laptop", "14 inch i5 laptop", electronics, 55999.0, 30, "https://example.com/image2.jpg");
//                Product p3 = new Product("Running Shoes", "Comfortable and durable", footwear, 1999.0, 100, "https://example.com/image3.jpg");
//
//                productRepository.saveAll(List.of(p1, p2, p3));
//            }
//        };
//    }
//}
