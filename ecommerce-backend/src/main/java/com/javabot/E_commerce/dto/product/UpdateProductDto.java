package com.javabot.E_commerce.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductDto {

    private String description;
    private Double price;
    private Integer stock;
    private String imageUrl;
}
