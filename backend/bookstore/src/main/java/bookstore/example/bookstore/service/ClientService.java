package bookstore.example.bookstore.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.dto.ClientRequest;
import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.repository.ClientRepo;

@Service
public class ClientService {
    private final ClientRepo clientRepo;
    private final PasswordEncoder passwordEncoder;    

    public ClientService(ClientRepo clientRepo, PasswordEncoder passwordEncoder) {
        this.clientRepo = clientRepo;
        this.passwordEncoder = passwordEncoder;
    }    

    @Transactional
    public Client addClient(ClientRequest request) {
        if (clientRepo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Имя пользователя уже занято");
        }

        Client client = new Client();
        client.setUsername(request.getUsername());
        client.setPassword(passwordEncoder.encode(request.getPassword())); 
        client.setRole("ROLE_CLIENT");
        client.setAge(request.getAge());

        return clientRepo.save(client);
    }

    public Client findByUsername(String username) {
        return clientRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }

    public boolean existsByUsername(String username) {
        return clientRepo.existsByUsername(username);
    }

    @Transactional
    public Client saveClient(Client client) {
        return clientRepo.save(client);
    }
}
