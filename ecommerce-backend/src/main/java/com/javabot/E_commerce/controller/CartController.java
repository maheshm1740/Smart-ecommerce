package com.javabot.E_commerce.controller;

import com.javabot.E_commerce.dto.cartItem.CartItemDto;
import com.javabot.E_commerce.model.CartItem;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.service.CartService;
import com.javabot.E_commerce.service.InteractionService;
import com.javabot.E_commerce.service.ProductService;
import com.javabot.E_commerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;
    private final InteractionService interactionService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestParam Long productId, @RequestParam int quantity,
                                              Principal principal) {

        CartItem cartItem = cartService.addToCart(principal.getName(), productId, quantity);

        User user = userService.findByEmail(principal.getName());
        Product product = productService.getProductById(productId);
        interactionService.logInteraction(user, product, "ADD_TO_CART");

        return ResponseEntity.ok(cartItem);
    }


    @GetMapping
    public ResponseEntity<List<CartItemDto>> getCartItems(Principal principal){

        return ResponseEntity.ok(cartService.getCartItems(principal.getName()));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeItem(Principal principal, @PathVariable Long productId){

        cartService.removeItem(principal.getName(), productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Principal principal){

        cartService.clearCart(principal.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<CartItem> updateItemQuantity(@RequestBody Map<String, Object> payload, Principal principal){

        Long productId=Long.valueOf(payload.get("productId").toString());
        int quantity=Integer.parseInt(payload.get("quantity").toString());

        CartItem updatedItem=cartService.updateItemQuantity(principal.getName(), productId, quantity);

        if(updatedItem==null){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(updatedItem);
    }
}
