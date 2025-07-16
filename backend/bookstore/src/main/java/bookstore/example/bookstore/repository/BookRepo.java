package bookstore.example.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.example.bookstore.model.Book;

public interface BookRepo extends JpaRepository<Book, Long>{
    
}
