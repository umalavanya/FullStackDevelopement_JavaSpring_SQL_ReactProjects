package com.musicstore.musicstoreapi.repository;

import com.musicstore.musicstoreapi.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // This interface gets CRUD operations for free!
    // We can add custom methods later
}