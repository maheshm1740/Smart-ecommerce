package com.javabot.E_commerce.controller;

import com.javabot.E_commerce.dto.order.OrderDto;
import com.javabot.E_commerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderDto> placeOrder(@RequestParam Long userId) {
        OrderDto orderDto = orderService.placeOrder(userId);
        return ResponseEntity.ok(orderDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderDto>> getUserOrders(@PathVariable Long userId) {
        List<OrderDto> orders = orderService.getUserOrders(userId);
        return ResponseEntity.ok(orders);
    }
}
