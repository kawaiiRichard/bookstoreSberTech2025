package bookstore.example.bookstore.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.dto.EmployeeRequest;
import bookstore.example.bookstore.model.Employee;
import bookstore.example.bookstore.repository.EmployeeRepo;
import bookstore.example.bookstore.service.EmployeeService;

@RestController
@RequestMapping("/admin/emps")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final PasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService, PasswordEncoder passwordEncoder) {
        this.employeeService = employeeService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/add-emp")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeRequest employeeRequest) {
        System.out.println("Полученный employeeRequest: " + employeeRequest.getUsername() + 
                   ", " + employeeRequest.getPassword() + ", age=" + employeeRequest.getAge() + 
                   ", salary=" + employeeRequest.getSalary() + ", role=" + employeeRequest.getRole());

        try {
            Employee savedEmployee = employeeService.addEmployee(employeeRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при добавлении сотрудника: " + e.getMessage());
        }
    }

    @Autowired
    EmployeeRepo employeeRepo;

    @GetMapping("/get-emps")
    List<Employee> getAllEmployees() {
        List<Employee> employee = employeeRepo.findAll();
        return employee;
    }

    @GetMapping("/get-emps/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete-emp/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            if (!employeeRepo.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Сотрудник не найден");
            }
            employeeRepo.deleteById(id);
            return ResponseEntity.ok("Сотрудник удалён");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при удалении сотрудника: " + e.getMessage());
        }
    }

    @PutMapping("/update-emp/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequest employeeRequest) {
        try {
            Optional<Employee> optionalEmployee = employeeRepo.findById(id);
            if (optionalEmployee.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Сотрудник не найден");
            }

            Employee employee = optionalEmployee.get();
            
            employee.setUsername(employeeRequest.getUsername());
            employee.setAge(employeeRequest.getAge());
            employee.setSalary(employeeRequest.getSalary());
            employee.setPassword(passwordEncoder.encode(employeeRequest.getPassword()));

            Employee updatedEmployee = employeeRepo.save(employee);
            return ResponseEntity.ok(updatedEmployee);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при обновлении сотрудника: " + e.getMessage());
        }
    }
}