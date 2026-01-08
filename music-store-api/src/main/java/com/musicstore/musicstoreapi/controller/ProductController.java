package com.musicstore.musicstoreapi.controller;

import com.musicstore.musicstoreapi.dto.ProductDTO;
import com.musicstore.musicstoreapi.dto.ProductResponseDTO;
import com.musicstore.musicstoreapi.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.musicstore.musicstoreapi.dto.PageResponse;


import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 1. Get all products
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // 2. Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Integer id) {
        ProductResponseDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // 3. Create new product
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductResponseDTO savedProduct = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    // 4. Update product
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Integer id,
                                                            @Valid @RequestBody ProductDTO productDTO) {
        ProductResponseDTO updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    // 5. Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // 6. Get products by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategory(@PathVariable Integer categoryId) {
        List<ProductResponseDTO> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    // 7. Get products by brand
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByBrand(@PathVariable String brand) {
        List<ProductResponseDTO> products = productService.getProductsByBrand(brand);
        return ResponseEntity.ok(products);
    }

    // 8. Search products by name
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDTO>> searchProducts(@RequestParam String name) {
        List<ProductResponseDTO> products = productService.searchProductsByName(name);
        return ResponseEntity.ok(products);
    }

    // 9. Get products in stock
    @GetMapping("/instock")
    public ResponseEntity<List<ProductResponseDTO>> getProductsInStock() {
        List<ProductResponseDTO> products = productService.getProductsInStock();
        return ResponseEntity.ok(products);
    }

    // 10. Get low stock products
    @GetMapping("/lowstock")
    public ResponseEntity<List<ProductResponseDTO>> getLowStockProducts() {
        List<ProductResponseDTO> products = productService.getLowStockProducts();
        return ResponseEntity.ok(products);
    }

    // 11. Get products by price range
    @GetMapping("/price-range")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {

        if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
            return ResponseEntity.badRequest().body(null);
        }

        List<ProductResponseDTO> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    // 12. Get products by multiple criteria
    @GetMapping("/filter")
    public ResponseEntity<List<ProductResponseDTO>> filterProducts(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean inStock) {

        // Get all products first
        List<ProductResponseDTO> allProducts = productService.getAllProducts();

        // Apply filters
        List<ProductResponseDTO> filteredProducts = allProducts.stream()
                .filter(product -> {
                    // Filter by category
                    if (categoryId != null) {
                        if (product.getCategory() == null || !product.getCategory().getId().equals(categoryId)) {
                            return false;
                        }
                    }

                    // Filter by brand
                    if (brand != null && !brand.isEmpty()) {
                        if (product.getBrand() == null || !product.getBrand().equalsIgnoreCase(brand)) {
                            return false;
                        }
                    }

                    // Filter by price range
                    if (minPrice != null && maxPrice != null) {
                        if (product.getPrice() == null ||
                                product.getPrice().doubleValue() < minPrice ||
                                product.getPrice().doubleValue() > maxPrice) {
                            return false;
                        }
                    }

                    // Filter by stock status
                    if (inStock != null) {
                        if (inStock && !product.isInStock()) {
                            return false;
                        }
                        if (!inStock && product.isInStock()) {
                            return false;
                        }
                    }

                    return true;
                })
                .toList();

        return ResponseEntity.ok(filteredProducts);
    }

    // 13. Get all products with pagination
    @GetMapping("/paged")
    public ResponseEntity<PageResponse<ProductResponseDTO>> getAllProductsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        // Validate page and size
        if (page < 0) {
            return ResponseEntity.badRequest().body(null);
        }
        if (size <= 0 || size > 100) {
            return ResponseEntity.badRequest().body(null);
        }

        PageResponse<ProductResponseDTO> products = productService.getAllProducts(page, size, sortBy, sortDir);
        return ResponseEntity.ok(products);
    }

    // 14. Get products by category with pagination
    @GetMapping("/category/{categoryId}/paged")
    public ResponseEntity<PageResponse<ProductResponseDTO>> getProductsByCategoryPaged(
            @PathVariable Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        // Validate page and size
        if (page < 0 || size <= 0 || size > 100) {
            return ResponseEntity.badRequest().body(null);
        }

        PageResponse<ProductResponseDTO> products = productService.getProductsByCategory(
                categoryId, page, size, sortBy, sortDir);
        return ResponseEntity.ok(products);
    }

    // 15. Get products by brand with pagination
    @GetMapping("/brand/{brand}/paged")
    public ResponseEntity<PageResponse<ProductResponseDTO>> getProductsByBrandPaged(
            @PathVariable String brand,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        // Validate page and size
        if (page < 0 || size <= 0 || size > 100) {
            return ResponseEntity.badRequest().body(null);
        }

        PageResponse<ProductResponseDTO> products = productService.getProductsByBrand(
                brand, page, size, sortBy, sortDir);
        return ResponseEntity.ok(products);
    }

    // 16. Search products with pagination
    @GetMapping("/search/paged")
    public ResponseEntity<PageResponse<ProductResponseDTO>> searchProductsPaged(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        // Validate page and size
        if (page < 0 || size <= 0 || size > 100) {
            return ResponseEntity.badRequest().body(null);
        }

        PageResponse<ProductResponseDTO> products = productService.searchProductsByName(
                name, page, size, sortBy, sortDir);
        return ResponseEntity.ok(products);
    }

    // 17. Get products in stock with pagination
    @GetMapping("/instock/paged")
    public ResponseEntity<PageResponse<ProductResponseDTO>> getProductsInStockPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        // Validate page and size
        if (page < 0 || size <= 0 || size > 100) {
            return ResponseEntity.badRequest().body(null);
        }

        PageResponse<ProductResponseDTO> products = productService.getProductsInStock(
                page, size, sortBy, sortDir);
        return ResponseEntity.ok(products);
    }
}