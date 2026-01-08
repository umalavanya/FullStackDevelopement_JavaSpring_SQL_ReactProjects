package com.musicstore.musicstoreapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching  // Add this annotation
public class MusicStoreApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicStoreApiApplication.class, args);
	}
}