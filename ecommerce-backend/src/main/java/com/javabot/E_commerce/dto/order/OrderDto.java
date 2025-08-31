package com.javabot.E_commerce.dto.order;

import com.javabot.E_commerce.model.Order;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private Double totalPrice;
    private LocalDateTime orderDate;
    private List<OrderItemDto> orderItems;
    private String userEmail;

    public static OrderDto from(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderDate(order.getOrderDate());
        dto.setUserEmail(order.getUser().getEmail());

        List<OrderItemDto> itemDtos = order.getOrderItems().stream()
                .map(OrderItemDto::from)
                .toList();

        dto.setOrderItems(itemDtos);
        return dto;
    }
}
