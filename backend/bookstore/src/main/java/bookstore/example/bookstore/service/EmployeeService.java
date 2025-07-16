package bookstore.example.bookstore.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.dto.EmployeeRequest;
import bookstore.example.bookstore.model.Employee;
import bookstore.example.bookstore.repository.EmployeeRepo;

@Service
public class EmployeeService {

    private final EmployeeRepo employeeRepo;
    private final PasswordEncoder passwordEncoder;   

    public EmployeeService(EmployeeRepo employeeRepo, PasswordEncoder passwordEncoder) {
        this.employeeRepo = employeeRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Employee addEmployee(EmployeeRequest request) {
        Employee employee = new Employee();

        employee.setUsername(request.getUsername());
        employee.setPassword(passwordEncoder.encode(request.getPassword())); 
        employee.setAge(request.getAge() != null ? request.getAge() : 0);
        employee.setSalary(request.getSalary() != null ? request.getSalary() : 0.0);
        employee.setRole("ROLE_EMPLOYEE"); 

        return employeeRepo.save(employee);
    }

    // public Employee findByUsername(String username) {
    //     return employeeRepo.findByUsername(username).orElse(null);
    // }

    public Employee findByUsername(String username) {
        return employeeRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден(employee)"));
    }

    public boolean existsByUsername(String username) {
        return employeeRepo.existsByUsername(username);
    }

    @Transactional
    public Employee saveClient(Employee employee) {
        return employeeRepo.save(employee);
    }
}
