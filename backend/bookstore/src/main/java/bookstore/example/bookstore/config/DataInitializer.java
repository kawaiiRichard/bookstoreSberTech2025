package bookstore.example.bookstore.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.repository.ClientRepo;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(ClientRepo clientRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if (clientRepo.findByUsername("admin").isEmpty()) {
                Client admin = new Client();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setAge(30);
                admin.setRole("ROLE_ADMIN");
                clientRepo.save(admin);
                System.out.println("Администратор создан: admin / admin");
            }
        };
    }
    
}