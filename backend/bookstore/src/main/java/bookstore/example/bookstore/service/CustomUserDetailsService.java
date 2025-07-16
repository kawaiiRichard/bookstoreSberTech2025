package bookstore.example.bookstore.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.model.Employee;
import bookstore.example.bookstore.repository.ClientRepo;
import bookstore.example.bookstore.repository.EmployeeRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    private final ClientRepo clientRepo;
    private final EmployeeRepo employeeRepo;
    
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = clientRepo.findByUsername(username).orElse(null);
        
        if (client != null) {
            System.out.println("Authenticating client: " + username);
            return createUserDetails(client.getUsername(), client.getPassword(), client.getRole());
        }
        
        Employee employee = employeeRepo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        System.out.println("Authenticating employee: " + username);
        return createUserDetails(employee.getUsername(), employee.getPassword(), employee.getRole());
    }
    
    private UserDetails createUserDetails(String username, String password, String role) {
        return new org.springframework.security.core.userdetails.User(
            username,
            password,
            Collections.singleton(new SimpleGrantedAuthority(role))
        );
    }
}
