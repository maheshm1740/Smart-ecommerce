package com.javabot.E_commerce.dto.order;

import com.javabot.E_commerce.model.OrderItem;
import lombok.Data;

@Data
public class OrderItemDto {
    private Long id;
    private int quantity;
    private double price;
    private String productName;

    public static OrderItemDto from(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setProductName(item.getProduct().getName());
        return dto;
    }
}
