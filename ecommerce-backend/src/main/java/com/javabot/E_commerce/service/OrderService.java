package com.javabot.E_commerce.service;

import com.javabot.E_commerce.dto.order.OrderDto;
import com.javabot.E_commerce.exception.ResourceNotFoundException;
import com.javabot.E_commerce.mapper.OrderMapper;
import com.javabot.E_commerce.model.CartItem;
import com.javabot.E_commerce.model.Order;
import com.javabot.E_commerce.model.OrderItem;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.repository.CartItemRepository;
import com.javabot.E_commerce.repository.OrderRepository;
import com.javabot.E_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final InteractionService interactionService;

    public OrderDto placeOrder(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User email not registered"));

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        if (cartItems.isEmpty()) {
            throw new ResourceNotFoundException("Cart is empty");
        }

        for (CartItem cartItem : cartItems) {
            int productStock = cartItem.getProduct().getStock(); // Assumes getStock() exists
            int requestedQty = cartItem.getQuantity();

            if (requestedQty > productStock) {
                throw new ResourceNotFoundException("Product " + cartItem.getProduct().getName() +
                        " has only " + productStock + " in stock, requested: " + requestedQty);
            }
        }

        double totalPrice = cartItems.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalPrice(totalPrice);

        List<OrderItem> orderItems = cartItems.stream().map(cartItem -> {
            var product=cartItem.getProduct();
            int quantity= cartItem.getQuantity();

            product.setStock(product.getStock()-quantity);

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setOrder(order);
            interactionService.logInteraction(user, cartItem.getProduct(), "PURCHASE");
            return orderItem;
        }).toList();

        order.setOrderItems(orderItems);
        orderRepository.save(order);

        cartItemRepository.deleteAll(cartItems);

        return OrderMapper.toOrderDto(order);
    }

    public List<OrderDto> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return OrderMapper.toOrderDtoList(orders);
    }
}
