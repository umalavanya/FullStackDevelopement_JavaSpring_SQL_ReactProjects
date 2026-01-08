package com.musicstore.musicstoreapi.repository;

import com.musicstore.musicstoreapi.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Custom method to find products by category
    List<Product> findByCategoryId(Integer categoryId);

    // Custom method with pagination
    Page<Product> findByCategoryId(Integer categoryId, Pageable pageable);

    // Custom method to find products by brand
    List<Product> findByBrand(String brand);

    // Custom method with pagination
    Page<Product> findByBrand(String brand, Pageable pageable);

    // Search by name with pagination
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Find products in stock with pagination
    Page<Product> findByStockQuantityGreaterThan(Integer stockQuantity, Pageable pageable);

    // Find products by price range with pagination
    Page<Product> findByPriceBetween(Double minPrice, Double maxPrice, Pageable pageable);
}