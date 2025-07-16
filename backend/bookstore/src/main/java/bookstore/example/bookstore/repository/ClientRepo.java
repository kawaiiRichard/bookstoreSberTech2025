
package bookstore.example.bookstore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.model.Client;

public interface ClientRepo extends JpaRepository<Client, Long>{
    @Transactional(readOnly = true)
    Optional<Client> findByUsername(String username);

    @Transactional(readOnly = true)
    boolean existsByUsername(String username);

    @Transactional
    void deleteByUsername(String username);
}
