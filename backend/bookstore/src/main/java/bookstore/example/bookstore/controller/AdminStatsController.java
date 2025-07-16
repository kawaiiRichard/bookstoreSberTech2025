package bookstore.example.bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.repository.BookRepo;
import bookstore.example.bookstore.repository.ClientRepo;
import bookstore.example.bookstore.repository.EmployeeRepo;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AdminStatsController {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private BookRepo bookRepo;

    @GetMapping("/admin/counts")
    public Map<String, Long> getCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("employees", employeeRepo.count());
        counts.put("clients", clientRepo.count());
        counts.put("books", bookRepo.count());
        return counts;
    }
}
