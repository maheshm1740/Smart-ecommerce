package com.javabot.E_commerce.service;

import com.javabot.E_commerce.dto.cartItem.CartItemDto;
import com.javabot.E_commerce.exception.ResourceNotFoundException;
import com.javabot.E_commerce.model.CartItem;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.repository.CartItemRepository;
import com.javabot.E_commerce.repository.ProductRepository;
import com.javabot.E_commerce.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartItem addToCart(String userEmail, Long productID, int quantity){
        User user=userRepository.findByEmail(userEmail).orElseThrow(()->new ResourceNotFoundException("User email not registered"));
        Product product=productRepository.findById(productID).orElseThrow(()->new ResourceNotFoundException("Product out of stock"));

        Optional<CartItem> existingItem=cartItemRepository.findByUserAndProductId(user, productID);

        if(existingItem.isPresent()){
            CartItem item=existingItem.get();
            item.setQuantity(item.getQuantity()+quantity);
            return  cartItemRepository.save(item);
        }

        CartItem cartItem=new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    public List<CartItemDto> getCartItems(String userEmail){

        User user=userRepository.findByEmail(userEmail).orElseThrow(()->new ResourceNotFoundException("User email not registered"));
        List<CartItem> cartItems=cartItemRepository.findByUser(user);

        return cartItems.stream().map(item->{
            Product product=item.getProduct();
            return new CartItemDto(
                    item.getId(),
                    product.getId(),
                    product.getName(),
                    product.getImageUrl(),
                    product.getPrice(),
                    item.getQuantity(),
                    product.getPrice() * item.getQuantity()
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public void removeItem(String userEmail, Long productId){
        User user=userRepository.findByEmail(userEmail).orElseThrow(()->new ResourceNotFoundException("User email not registered"));
        cartItemRepository.deleteByUserAndProductId(user, productId);
    }

    public void clearCart(String userEmail){
        User user=userRepository.findByEmail(userEmail).orElseThrow();
        List<CartItem> cartItems=cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(cartItems);
    }

    public CartItem updateItemQuantity(String userEmail, Long productId, int quantity){
        User user=userRepository.findByEmail(userEmail).orElseThrow(()->new ResourceNotFoundException("User email not registered"));
        CartItem item=cartItemRepository.findByUserAndProductId(user, productId).orElseThrow(()->new ResourceNotFoundException("Item not yet add to cart"));
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }
}
