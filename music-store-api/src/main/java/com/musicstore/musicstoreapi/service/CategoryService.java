package com.musicstore.musicstoreapi.service;

import com.musicstore.musicstoreapi.dto.CategoryDTO;
import com.musicstore.musicstoreapi.dto.CategoryResponseDTO;
import com.musicstore.musicstoreapi.entity.Category;
import com.musicstore.musicstoreapi.exception.BusinessException;
import com.musicstore.musicstoreapi.exception.ResourceNotFoundException;
import com.musicstore.musicstoreapi.repository.CategoryRepository;
import com.musicstore.musicstoreapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    // Get all categories with product count - Cache this
    @Cacheable(value = "categories", key = "'all'")
    public List<CategoryResponseDTO> getAllCategories() {
        System.out.println("Fetching all categories from database...");
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> {
                    Integer productCount = productRepository.findByCategoryId(category.getId()).size();
                    return convertToResponseDTO(category, productCount);
                })
                .collect(Collectors.toList());
    }

    // Get category by ID - Cache individual categories
    @Cacheable(value = "categoryDetail", key = "#id")
    public CategoryResponseDTO getCategoryById(Integer id) {
        System.out.println("Fetching category " + id + " from database...");
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        Integer productCount = productRepository.findByCategoryId(id).size();
        return convertToResponseDTO(category, productCount);
    }

    // Create new category - Evict categories cache
    @CacheEvict(value = "categories", key = "'all'")
    public CategoryResponseDTO createCategory(CategoryDTO categoryDTO) {
        // Check if category with same name already exists
        List<Category> existingCategories = categoryRepository.findAll();
        boolean nameExists = existingCategories.stream()
                .anyMatch(c -> c.getName().equalsIgnoreCase(categoryDTO.getName()));

        if (nameExists) {
            throw new BusinessException("Category with name '" + categoryDTO.getName() + "' already exists");
        }

        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());

        Category savedCategory = categoryRepository.save(category);
        return convertToResponseDTO(savedCategory, 0); // New category has 0 products
    }

    // Update category - Update cache
    @CachePut(value = "categoryDetail", key = "#id")
    @CacheEvict(value = "categories", key = "'all'")
    public CategoryResponseDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        System.out.println("Updating category " + id + " in database...");
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        // Check if new name conflicts with other categories
        if (categoryDTO.getName() != null && !category.getName().equals(categoryDTO.getName())) {
            List<Category> otherCategories = categoryRepository.findAll()
                    .stream()
                    .filter(c -> !c.getId().equals(id))
                    .collect(Collectors.toList());

            boolean nameExists = otherCategories.stream()
                    .anyMatch(c -> c.getName().equalsIgnoreCase(categoryDTO.getName()));

            if (nameExists) {
                throw new BusinessException("Category with name '" + categoryDTO.getName() + "' already exists");
            }
        }

        // Update fields
        if (categoryDTO.getName() != null) {
            category.setName(categoryDTO.getName());
        }
        if (categoryDTO.getDescription() != null) {
            category.setDescription(categoryDTO.getDescription());
        }
        category.setUpdatedAt(LocalDateTime.now());

        Category updatedCategory = categoryRepository.save(category);
        Integer productCount = productRepository.findByCategoryId(id).size();
        return convertToResponseDTO(updatedCategory, productCount);
    }

    // Delete category - Evict caches
    @CacheEvict(value = {"categoryDetail", "categories"}, key = "#id")
    public void deleteCategory(Integer id) {
        System.out.println("Deleting category " + id + " from database...");
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        // Check if category has products
        Integer productCount = productRepository.findByCategoryId(id).size();
        if (productCount > 0) {
            throw new BusinessException("Cannot delete category because it contains " + productCount + " products");
        }

        categoryRepository.deleteById(id);
    }

    // Search categories by name - Don't cache this (search results vary)
    public List<CategoryResponseDTO> searchCategoriesByName(String name) {
        System.out.println("Searching categories with name: " + name);
        List<Category> allCategories = categoryRepository.findAll();
        return allCategories.stream()
                .filter(category -> category.getName().toLowerCase().contains(name.toLowerCase()))
                .map(category -> {
                    Integer productCount = productRepository.findByCategoryId(category.getId()).size();
                    return convertToResponseDTO(category, productCount);
                })
                .collect(Collectors.toList());
    }

    // Helper method to convert Entity to Response DTO
    private CategoryResponseDTO convertToResponseDTO(Category category, Integer productCount) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCreatedAt(),
                category.getUpdatedAt(),
                productCount
        );
    }
}