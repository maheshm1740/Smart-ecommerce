package com.javabot.E_commerce.service;

import com.javabot.E_commerce.dto.product.CreateProductDto;
import com.javabot.E_commerce.dto.product.ProductDto;
import com.javabot.E_commerce.dto.product.UpdateProductDto;
import com.javabot.E_commerce.mapper.ProductMapper;
import com.javabot.E_commerce.model.Category;
import com.javabot.E_commerce.model.Product;
import com.javabot.E_commerce.repository.CategoryRepository;
import com.javabot.E_commerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public List<ProductDto> getAllProducts(){
        return productRepository.findAll()
                .stream().map(ProductMapper :: toDTO).collect(Collectors.toList());
    }

    public List<ProductDto> getByName(String name){
        return productRepository.findByName(name)
                .stream().map(ProductMapper :: toDTO).collect(Collectors.toList());
    }

    public ProductDto getProductByID(Long id){
       Product product= productRepository.findById(id)
               .orElseThrow(()->new RuntimeException("No post exists with id "+id));
       return ProductMapper.toDTO(product);
    }

    public List<ProductDto> getPostByKeyword(String keyword){
        return productRepository.findByNameContainingIgnoreCase(keyword)
                .stream().map(ProductMapper :: toDTO).collect(Collectors.toList());
    }

    public List<ProductDto> findByCategory(String categoryName) {
        return productRepository.findByCategoryNameIgnoreCase(categoryName.trim())
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDto> findByPrice(Double minPrice, Double maxPrice){
        return  productRepository.findByPriceBetween(minPrice, maxPrice)
                .stream().map(ProductMapper :: toDTO).collect(Collectors.toList());
    }

    public ProductDto addProduct(CreateProductDto dto){
        Category category = categoryRepository.findByNameIgnoreCase(dto.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Product product = ProductMapper.toEntity(dto, category);
        Product newProduct=productRepository.save(product);
        return ProductMapper.toDTO(newProduct);
    }

    public void deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            throw new RuntimeException("Post not found");
        }
        productRepository.deleteById(id);
    }

    public ProductDto updateProduct(Long id, UpdateProductDto dto){
        Product product=productRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found"));

        product.setDescription(dto.getDescription());
        product.setStock(dto.getStock());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());

        Product updatedProduct=productRepository.save(product);
        return ProductMapper.toDTO(updatedProduct);
    }
    public List<ProductDto> exploreProducts(
            String keyword,
            String category,
            Double minPrice,
            Double maxPrice,
            String sortBy,
            String order
    ) {
        List<Product> products = productRepository.findAll();

        Stream<Product> productStream = products.stream();

        if (keyword != null && !keyword.isEmpty()) {
            String lowerKeyword = keyword.toLowerCase();
            productStream = productStream.filter(p ->
                    p.getName().toLowerCase().contains(lowerKeyword) ||
                            p.getDescription().toLowerCase().contains(lowerKeyword)
            );
        }

        if (category != null && !category.isEmpty()) {
            productStream = productStream.filter(p ->
                    p.getCategory().getName().equalsIgnoreCase(category)
            );
        }

        if (minPrice != null) {
            productStream = productStream.filter(p -> p.getPrice() >= minPrice);
        }

        if (maxPrice != null) {
            productStream = productStream.filter(p -> p.getPrice() <= maxPrice);
        }

        // Sorting logic
        if (sortBy != null) {
            Comparator<Product> comparator;

            switch (sortBy) {
                case "price":
                    comparator = Comparator.comparing(Product::getPrice);
                    break;
                case "name":
                    comparator = Comparator.comparing(Product::getName, String.CASE_INSENSITIVE_ORDER);
                    break;
                case "stock":
                    comparator = Comparator.comparing(Product::getStock);
                    break;
                default:
                    comparator = Comparator.comparing(Product::getId); // Default sort by ID
            }

            if ("desc".equalsIgnoreCase(order)) {
                comparator = comparator.reversed();
            }

            productStream = productStream.sorted(comparator);
        }

        // Convert to DTO
        return productStream
                .map(ProductMapper::toDTO) // Assuming you have a ProductMapper with toDto method
                .collect(Collectors.toList());
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }
}
