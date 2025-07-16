package bookstore.example.bookstore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{
    @Transactional(readOnly = true)
    Optional<Employee> findByUsername(String username);
    
    @Transactional(readOnly = true)
    boolean existsByUsername(String username);

    @Transactional
    void deleteByUsername(String username);
}
