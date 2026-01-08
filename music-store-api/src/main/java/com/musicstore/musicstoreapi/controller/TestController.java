package com.musicstore.musicstoreapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private CacheManager cacheManager;

    @GetMapping("/status")
    public String getStatus() {
        return "✅ Music Store API is running with Pagination, Sorting & Caching!";
    }

    @GetMapping("/pagination-endpoints")
    public String getPaginationEndpoints() {
        return """
               📄 Pagination Endpoints:
               
               Products with Pagination:
               - GET /api/products/paged?page=0&size=10&sortBy=price&sortDir=desc
               - GET /api/products/category/{id}/paged?page=0&size=5
               - GET /api/products/brand/{brand}/paged?page=0&size=10&sortBy=name
               - GET /api/products/search/paged?name=guitar&page=0&size=10
               - GET /api/products/instock/paged?page=0&size=20&sortBy=stockQuantity
               
               Default Values:
               - page: 0 (first page)
               - size: 10 (items per page)
               - sortBy: id
               - sortDir: asc (ascending)
               
               Available Sort Fields:
               - id, name, price, stockQuantity, createdAt, updatedAt
               
               Sort Directions:
               - asc: Ascending (A-Z, 0-9)
               - desc: Descending (Z-A, 9-0)
               """;
    }

    @GetMapping("/cache-endpoints")
    public String getCacheEndpoints() {
        return """
               🗄️ Cache Management Endpoints:
               
               Check Cache Info:
               - GET /api/test/cache-info
               
               Clear Cache:
               - GET /api/test/clear-cache
               - GET /api/test/clear-cache?cacheName=categories
               - GET /api/test/clear-cache?cacheName=products
               
               Available Caches:
               - categories
               - products
               - categoryDetail
               - productDetail
               - productsByCategory
               - productsByBrand
               - productsInStock
               
               Cache Behavior:
               - First request hits database
               - Subsequent requests served from cache
               - Cache auto-invalidates on updates
               - Cache TTL: 5 minutes
               """;
    }

    @GetMapping("/cache-info")
    public Map<String, Object> getCacheInfo() {
        Map<String, Object> cacheInfo = new HashMap<>();

        if (cacheManager != null) {
            // Get cache names and basic info
            cacheInfo.put("cacheNames", cacheManager.getCacheNames());
            cacheInfo.put("cacheManagerClass", cacheManager.getClass().getSimpleName());
            cacheInfo.put("cacheCount", cacheManager.getCacheNames().size());

            // Try to get cache statistics if available
            Map<String, Object> cacheStats = new HashMap<>();
            for (String cacheName : cacheManager.getCacheNames()) {
                org.springframework.cache.Cache cache = cacheManager.getCache(cacheName);
                if (cache != null) {
                    Map<String, Object> stats = new HashMap<>();
                    stats.put("nativeCacheClass", cache.getNativeCache().getClass().getSimpleName());

                    // For ConcurrentMapCache, we can get some info
                    if (cache.getNativeCache() instanceof java.util.concurrent.ConcurrentMap) {
                        java.util.concurrent.ConcurrentMap<?, ?> map =
                                (java.util.concurrent.ConcurrentMap<?, ?>) cache.getNativeCache();
                        stats.put("estimatedSize", map.size());
                    }

                    cacheStats.put(cacheName, stats);
                }
            }
            cacheInfo.put("cacheStatistics", cacheStats);
        } else {
            cacheInfo.put("error", "CacheManager is not available");
        }

        return cacheInfo;
    }

    @GetMapping("/clear-cache")
    public String clearCache(@RequestParam(required = false) String cacheName) {
        if (cacheManager == null) {
            return "CacheManager is not available";
        }

        if (cacheName != null && !cacheName.isEmpty()) {
            // Clear specific cache
            org.springframework.cache.Cache cache = cacheManager.getCache(cacheName);
            if (cache != null) {
                cache.clear();
                return "Cache '" + cacheName + "' cleared successfully";
            } else {
                return "Cache '" + cacheName + "' not found";
            }
        } else {
            // Clear all caches
            for (String name : cacheManager.getCacheNames()) {
                org.springframework.cache.Cache cache = cacheManager.getCache(name);
                if (cache != null) {
                    cache.clear();
                }
            }
            return "All caches cleared successfully";
        }
    }

    @GetMapping("/architecture")
    public String getArchitecture() {
        return """
               🏗️ Current Architecture:
               
               Layer 1: Database (MySQL)
               Layer 2: Entities (JPA)
               Layer 3: Repositories (Spring Data JPA)
               Layer 4: Services (Business Logic + Caching)
               Layer 5: DTOs (Data Transfer Objects)
               Layer 6: Controllers (REST Endpoints)
               
               ✅ Clean Separation of Concerns
               ✅ Better API Contracts with DTOs
               ✅ Centralized Business Logic in Services
               ✅ Performance Optimization with Caching
               ✅ Scalable with Pagination
               
               Features Implemented:
               1. Database Design & Setup
               2. JPA Entities & Relationships
               3. REST Controllers (CRUD)
               4. Service Layer with Business Logic
               5. DTO Pattern
               6. Global Exception Handling
               7. Input Validation
               8. Pagination & Sorting
               9. In-Memory Caching
               
               Next Steps:
               - API Documentation (Swagger)
               - Security (JWT Authentication)
               - File Upload
               - Deployment
               """;
    }
}