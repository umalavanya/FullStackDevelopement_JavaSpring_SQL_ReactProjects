package com.musicstore.musicstoreapi.service;

import com.musicstore.musicstoreapi.dto.PageResponse;
import com.musicstore.musicstoreapi.dto.ProductDTO;
import com.musicstore.musicstoreapi.dto.ProductResponseDTO;
import com.musicstore.musicstoreapi.dto.CategoryResponseDTO;
import com.musicstore.musicstoreapi.entity.Product;
import com.musicstore.musicstoreapi.entity.Category;
import com.musicstore.musicstoreapi.exception.ResourceNotFoundException;
import com.musicstore.musicstoreapi.repository.ProductRepository;
import com.musicstore.musicstoreapi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    // Get all products - Cache this
    @Cacheable(value = "products", key = "'all'")
    public List<ProductResponseDTO> getAllProducts() {
        System.out.println("Fetching all products from database...");
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get all products with pagination
    public PageResponse<ProductResponseDTO> getAllProducts(int page, int size, String sortBy, String sortDir) {
        // Create Pageable instance
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        // Get products page
        Page<Product> productsPage = productRepository.findAll(pageable);

        // Convert to DTO
        List<ProductResponseDTO> content = productsPage.getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new PageResponse<>(
                content,
                productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productsPage.isFirst(),
                productsPage.isLast()
        );
    }

    // Get product by ID - Cache individual products
    @Cacheable(value = "productDetail", key = "#id")
    public ProductResponseDTO getProductById(Integer id) {
        System.out.println("Fetching product " + id + " from database...");
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return convertToResponseDTO(product);
    }

    // Create new product - Evict caches
    @CacheEvict(value = {"products", "productsByCategory", "productsByBrand", "productsInStock"}, allEntries = true)
    public ProductResponseDTO createProduct(ProductDTO productDTO) {
        System.out.println("Creating new product in database...");
        // Validate category exists
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", productDTO.getCategoryId()));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setBrand(productDTO.getBrand());
        product.setImageUrl(productDTO.getImageUrl());
        product.setCategory(category);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);
        return convertToResponseDTO(savedProduct);
    }

    // Update product - Update cache and evict others
    @Caching(
            put = @CachePut(value = "productDetail", key = "#id"),
            evict = {
                    @CacheEvict(value = "products", allEntries = true),
                    @CacheEvict(value = "productsByCategory", allEntries = true),
                    @CacheEvict(value = "productsByBrand", allEntries = true),
                    @CacheEvict(value = "productsInStock", allEntries = true)
            }
    )
    public ProductResponseDTO updateProduct(Integer id, ProductDTO productDTO) {
        System.out.println("Updating product " + id + " in database...");
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        // Update fields
        if (productDTO.getName() != null) {
            product.setName(productDTO.getName());
        }
        if (productDTO.getDescription() != null) {
            product.setDescription(productDTO.getDescription());
        }
        if (productDTO.getPrice() != null) {
            product.setPrice(productDTO.getPrice());
        }
        if (productDTO.getStockQuantity() != null) {
            product.setStockQuantity(productDTO.getStockQuantity());
        }
        if (productDTO.getBrand() != null) {
            product.setBrand(productDTO.getBrand());
        }
        if (productDTO.getImageUrl() != null) {
            product.setImageUrl(productDTO.getImageUrl());
        }
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", productDTO.getCategoryId()));
            product.setCategory(category);
        }

        product.setUpdatedAt(LocalDateTime.now());

        Product updatedProduct = productRepository.save(product);
        return convertToResponseDTO(updatedProduct);
    }

    // Delete product - Evict all related caches
    @Caching(
            evict = {
                    @CacheEvict(value = "productDetail", key = "#id"),
                    @CacheEvict(value = "products", allEntries = true),
                    @CacheEvict(value = "productsByCategory", allEntries = true),
                    @CacheEvict(value = "productsByBrand", allEntries = true),
                    @CacheEvict(value = "productsInStock", allEntries = true)
            }
    )
    public void deleteProduct(Integer id) {
        System.out.println("Deleting product " + id + " from database...");
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        productRepository.deleteById(id);
    }

    // Get products by category - Cache with category ID
    @Cacheable(value = "productsByCategory", key = "#categoryId")
    public List<ProductResponseDTO> getProductsByCategory(Integer categoryId) {
        System.out.println("Fetching products for category " + categoryId + " from database...");
        // Validate category exists
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category", "id", categoryId);
        }

        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get products by category with pagination
    public PageResponse<ProductResponseDTO> getProductsByCategory(Integer categoryId,
                                                                  int page, int size,
                                                                  String sortBy, String sortDir) {
        // Validate category exists
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category", "id", categoryId);
        }

        // Create Pageable instance
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        // Get products page
        Page<Product> productsPage = productRepository.findByCategoryId(categoryId, pageable);

        // Convert to DTO
        List<ProductResponseDTO> content = productsPage.getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new PageResponse<>(
                content,
                productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productsPage.isFirst(),
                productsPage.isLast()
        );
    }

    // Get products by brand - Cache with brand name
    @Cacheable(value = "productsByBrand", key = "#brand")
    public List<ProductResponseDTO> getProductsByBrand(String brand) {
        System.out.println("Fetching products for brand " + brand + " from database...");
        List<Product> products = productRepository.findByBrand(brand);
        return products.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get products by brand with pagination
    public PageResponse<ProductResponseDTO> getProductsByBrand(String brand,
                                                               int page, int size,
                                                               String sortBy, String sortDir) {
        // Create Pageable instance
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        // Get products page
        Page<Product> productsPage = productRepository.findByBrand(brand, pageable);

        // Convert to DTO
        List<ProductResponseDTO> content = productsPage.getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new PageResponse<>(
                content,
                productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productsPage.isFirst(),
                productsPage.isLast()
        );
    }

    // Search products by name
    public List<ProductResponseDTO> searchProductsByName(String name) {
        System.out.println("Searching products with name: " + name);
        List<Product> allProducts = productRepository.findAll();
        return allProducts.stream()
                .filter(product -> product.getName().toLowerCase().contains(name.toLowerCase()))
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Search products by name with pagination
    public PageResponse<ProductResponseDTO> searchProductsByName(String name,
                                                                 int page, int size,
                                                                 String sortBy, String sortDir) {
        // Create Pageable instance
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        // Get products page
        Page<Product> productsPage = productRepository.findByNameContainingIgnoreCase(name, pageable);

        // Convert to DTO
        List<ProductResponseDTO> content = productsPage.getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new PageResponse<>(
                content,
                productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productsPage.isFirst(),
                productsPage.isLast()
        );
    }

    // Get products in stock - Cache this
    @Cacheable(value = "productsInStock", key = "'all'")
    public List<ProductResponseDTO> getProductsInStock() {
        System.out.println("Fetching in-stock products from database...");
        List<Product> allProducts = productRepository.findAll();
        return allProducts.stream()
                .filter(product -> product.getStockQuantity() != null && product.getStockQuantity() > 0)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get products in stock with pagination
    public PageResponse<ProductResponseDTO> getProductsInStock(int page, int size,
                                                               String sortBy, String sortDir) {
        // Create Pageable instance
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        // Get products page (stock > 0)
        Page<Product> productsPage = productRepository.findByStockQuantityGreaterThan(0, pageable);

        // Convert to DTO
        List<ProductResponseDTO> content = productsPage.getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return new PageResponse<>(
                content,
                productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productsPage.isFirst(),
                productsPage.isLast()
        );
    }

    // Get low stock products
    public List<ProductResponseDTO> getLowStockProducts() {
        System.out.println("Fetching low stock products from database...");
        List<Product> allProducts = productRepository.findAll();
        return allProducts.stream()
                .filter(product -> product.getStockQuantity() != null
                        && product.getStockQuantity() > 0
                        && product.getStockQuantity() <= 10)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Get products by price range
    public List<ProductResponseDTO> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        System.out.println("Fetching products by price range: " + minPrice + " - " + maxPrice);
        List<Product> allProducts = productRepository.findAll();
        return allProducts.stream()
                .filter(product -> {
                    if (product.getPrice() == null) return false;
                    double price = product.getPrice().doubleValue();
                    return price >= minPrice && price <= maxPrice;
                })
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Helper method to convert Entity to Response DTO
    private ProductResponseDTO convertToResponseDTO(Product product) {
        CategoryResponseDTO categoryDTO = null;
        if (product.getCategory() != null) {
            categoryDTO = categoryService.getCategoryById(product.getCategory().getId());
        }

        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getBrand(),
                product.getImageUrl(),
                product.getCreatedAt(),
                product.getUpdatedAt(),
                categoryDTO
        );
    }
}