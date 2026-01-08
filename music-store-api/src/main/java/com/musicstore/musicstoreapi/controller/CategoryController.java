package com.musicstore.musicstoreapi.controller;

import com.musicstore.musicstoreapi.dto.CategoryDTO;
import com.musicstore.musicstoreapi.dto.CategoryResponseDTO;
import com.musicstore.musicstoreapi.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // 1. Get all categories
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // 2. Get category by ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Integer id) {
        CategoryResponseDTO category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    // 3. Create new category
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryResponseDTO savedCategory = categoryService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    // 4. Update category
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable Integer id,
                                                              @Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryResponseDTO updatedCategory = categoryService.updateCategory(id, categoryDTO);
        return ResponseEntity.ok(updatedCategory);
    }

    // 5. Delete category
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted successfully");
    }

    // 6. Search categories by name
    @GetMapping("/search")
    public ResponseEntity<List<CategoryResponseDTO>> searchCategories(@RequestParam String name) {
        List<CategoryResponseDTO> categories = categoryService.searchCategoriesByName(name);
        return ResponseEntity.ok(categories);
    }

    // 7. Get categories with product count
    @GetMapping("/with-product-count")
    public ResponseEntity<List<CategoryResponseDTO>> getCategoriesWithProductCount() {
        // This is already implemented in getAllCategories, but added for clarity
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}