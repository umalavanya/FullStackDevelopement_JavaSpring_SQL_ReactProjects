package com.musicstore.musicstoreapi.config;

import com.musicstore.musicstoreapi.entity.Category;
import com.musicstore.musicstoreapi.entity.Product;
import com.musicstore.musicstoreapi.repository.CategoryRepository;
import com.musicstore.musicstoreapi.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.Connection;

@Configuration
public class DatabaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConfig.class);

    @Bean
    public CommandLineRunner testDatabaseConnection(
            DataSource dataSource,
            CategoryRepository categoryRepository,
            ProductRepository productRepository) {

        return args -> {
            logger.info("Testing database connection...");

            try (Connection connection = dataSource.getConnection()) {
                logger.info("✅ Database Connection Successful!");
                logger.info("✅ Database: " + connection.getCatalog());
                logger.info("✅ Testing JPA Entities...");

                // Seed Categories
                Category guitars = new Category("Guitars", "Acoustic, electric, and bass guitars");
                Category keyboards = new Category("Keyboards", "Pianos, synthesizers, and MIDI controllers");
                Category drums = new Category("Drums & Percussion", "Drum kits, cymbals, and percussion instruments");

                categoryRepository.save(guitars);
                categoryRepository.save(keyboards);
                categoryRepository.save(drums);

                logger.info("✅ Categories saved: " + categoryRepository.count());

                // Seed Products
                Product product1 = new Product(
                        "Fender Stratocaster",
                        "American Professional II Electric Guitar",
                        new BigDecimal("1499.99"),
                        15,
                        "Fender",
                        "/images/stratocaster.jpg",
                        guitars
                );

                Product product2 = new Product(
                        "Yamaha FG800",
                        "Solid Top Acoustic Guitar",
                        new BigDecimal("229.99"),
                        30,
                        "Yamaha",
                        "/images/yamaha-fg800.jpg",
                        guitars
                );

                Product product3 = new Product(
                        "Roland FP-30X",
                        "Digital Piano with 88 Weighted Keys",
                        new BigDecimal("699.99"),
                        20,
                        "Roland",
                        "/images/roland-fp30x.jpg",
                        keyboards
                );

                productRepository.save(product1);
                productRepository.save(product2);
                productRepository.save(product3);

                logger.info("✅ Products saved: " + productRepository.count());

                // Test queries
                logger.info("✅ Testing custom queries...");
                logger.info("✅ Guitars in stock: " + productRepository.findByCategoryId(guitars.getId()).size());
                logger.info("✅ Yamaha products: " + productRepository.findByBrand("Yamaha").size());

            } catch (Exception e) {
                logger.error("❌ Error: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }
}