package bookstore.example.bookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.dto.ClientRequest;
import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.repository.ClientRepo;
import bookstore.example.bookstore.service.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/add-client")
    public ResponseEntity<?> addClient(@RequestBody ClientRequest clientRequest) {
        try {
            Client savedClient = clientService.addClient(clientRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при добавлении клиента: " + e.getMessage());
        }
    }

    @Autowired
    ClientRepo clientRepo;

    @GetMapping("/admin/get-clients")
    List<Client> getAllClients() {
        List<Client> client = clientRepo.findAll();
        return client;
    }
}
