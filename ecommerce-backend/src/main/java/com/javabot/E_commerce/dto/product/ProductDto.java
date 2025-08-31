package com.javabot.E_commerce.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private String categoryName;
    private Double price;
    private Integer stock;
    private String imageUrl;
}
