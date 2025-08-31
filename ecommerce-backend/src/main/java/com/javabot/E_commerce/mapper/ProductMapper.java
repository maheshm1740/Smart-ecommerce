package com.javabot.E_commerce.mapper;

import com.javabot.E_commerce.dto.product.CreateProductDto;
import com.javabot.E_commerce.dto.product.ProductDto;
import com.javabot.E_commerce.dto.product.UpdateProductDto;
import com.javabot.E_commerce.model.Category;
import com.javabot.E_commerce.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

        public static ProductDto toDTO(Product product) {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setPrice(product.getPrice());
            dto.setStock(product.getStock());
            dto.setImageUrl(product.getImageUrl());
            dto.setCategoryName(product.getCategory().getName());
            return dto;
    }

    public static Product toEntity(CreateProductDto dto, Category category) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setCategory(category);
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
        return product;
    }

    public static void updateEntity(Product product, UpdateProductDto dto) {
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
    }
}

