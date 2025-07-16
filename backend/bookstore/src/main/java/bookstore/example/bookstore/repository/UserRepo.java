package bookstore.example.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.example.bookstore.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
    
}
