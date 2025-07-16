package bookstore.example.bookstore.config;

import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.repository.ClientRepo;

@Component
@RequiredArgsConstructor
public class DataCleaner {

    private final ClientRepo clientRepo;

    @Transactional
    @PreDestroy
    public void deleteAdmin() {
        if (clientRepo.existsByUsername("admin")) {
            clientRepo.deleteByUsername("admin");
            System.out.println("Администратор удалён при завершении работы");
        }
    }
}
