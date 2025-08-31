package com.javabot.E_commerce.repository;

import com.javabot.E_commerce.model.Category;
import com.javabot.E_commerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    List<Product> findByCategoryNameIgnoreCase(String name);

    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    @Query("SELECT p FROM Product p WHERE p.category IN :categories")
    List<Product> findTopProductsByCategories(@Param("categories") Set<Category> categories);

    List<Product> findTop10ByCategoryInOrderByPriceAsc(List<Category> topCategories);

    @Query(value = "SELECT * FROM products ORDER BY RANDOM() LIMIT 10", nativeQuery = true)
    List<Product> findRandomProducts();
}
