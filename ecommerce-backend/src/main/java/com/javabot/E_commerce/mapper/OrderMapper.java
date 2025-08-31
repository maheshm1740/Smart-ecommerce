package com.javabot.E_commerce.mapper;

import com.javabot.E_commerce.dto.order.OrderDto;
import com.javabot.E_commerce.dto.order.OrderItemDto;
import com.javabot.E_commerce.model.Order;
import com.javabot.E_commerce.model.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDto toOrderDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setUserEmail(order.getUser().getEmail());
        dto.setOrderItems(toOrderItemDtoList(order.getOrderItems()));
        return dto;
    }

    public static List<OrderDto> toOrderDtoList(List<Order> orders) {
        return orders.stream()
                .map(OrderMapper::toOrderDto)
                .collect(Collectors.toList());
    }

    public static OrderItemDto toOrderItemDto(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setProductName(item.getProduct().getName());
        return dto;
    }

    public static List<OrderItemDto> toOrderItemDtoList(List<OrderItem> items) {
        return items.stream()
                .map(OrderMapper::toOrderItemDto)
                .collect(Collectors.toList());
    }
}
