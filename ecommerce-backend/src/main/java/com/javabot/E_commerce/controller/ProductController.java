package com.javabot.E_commerce.controller;

import com.javabot.E_commerce.dto.product.CreateProductDto;
import com.javabot.E_commerce.dto.product.ProductDto;
import com.javabot.E_commerce.dto.product.UpdateProductDto;
import com.javabot.E_commerce.mapper.ProductMapper;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.service.InteractionService;
import com.javabot.E_commerce.service.ProductService;
import com.javabot.E_commerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;
    private final InteractionService interactionService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/explore")
    public ResponseEntity<List<ProductDto>> exploreProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "asc") String order
    ) {
        return ResponseEntity.ok(
                productService.exploreProducts(keyword, category, minPrice, maxPrice, sortBy, order)
        );
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<ProductDto>> getProductByName(@PathVariable String name){
        return ResponseEntity.ok(productService.getByName(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id, Principal principal) {
        Product product = productService.getProductById(id);

        User user = userService.findByEmail(principal.getName());
        interactionService.logInteraction(user, product, "VIEW");

        return ResponseEntity.ok(ProductMapper.toDTO(product));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> getProductByKeyword(@RequestParam("keyword") String keyword){
        return ResponseEntity.ok(productService.getPostByKeyword(keyword));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDto>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.findByCategory(category));
    }

    @GetMapping("/price")
    public ResponseEntity<List<ProductDto>> getByPriceRange(@RequestParam Double min, @RequestParam Double max ){
        return ResponseEntity.ok(productService.findByPrice(min,max));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> addProduct(@RequestBody CreateProductDto dto){
        return ResponseEntity.ok(productService.addProduct(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody UpdateProductDto dto){
        return ResponseEntity.ok(productService.updateProduct(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
