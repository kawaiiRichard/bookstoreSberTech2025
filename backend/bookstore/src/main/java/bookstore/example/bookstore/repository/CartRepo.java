package bookstore.example.bookstore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.example.bookstore.model.Book;
import bookstore.example.bookstore.model.Cart;
import bookstore.example.bookstore.model.Client;

public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findByClient(Client client);

    Optional<Cart> findByClientAndBook(Client client, Book book);

    void deleteByClient(Client client);
}