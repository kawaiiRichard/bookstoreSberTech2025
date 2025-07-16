package bookstore.example.bookstore.service;

import org.springframework.stereotype.Service;

import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.model.User;
import bookstore.example.bookstore.repository.EmployeeRepo;

@Service
public class UserService {
    private final ClientService clientService;
    private final EmployeeRepo employeeRepo;

    public UserService(ClientService clientService, EmployeeRepo employeeRepo) {
        this.clientService = clientService;
        this.employeeRepo = employeeRepo;
    }

    public User findByUsername(String username) {
        Client client = clientService.findByUsername(username);
        if (client != null) {
            return client;
        }

        // return employeeRepo.findByUsername(username);
        return employeeRepo.findByUsername(username).orElse(null);
    }
}