package bookstore.example.bookstore.controller;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.dto.LoginRequest;
import bookstore.example.bookstore.dto.LoginResponse;
import bookstore.example.bookstore.dto.RegisterRequest;
import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.model.Employee;
import bookstore.example.bookstore.service.ClientService;
import bookstore.example.bookstore.service.EmployeeService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final ClientService clientService;
    private final PasswordEncoder passwordEncoder;
    private final EmployeeService employeeService;

    public AuthController(AuthenticationManager authenticationManager,
                        ClientService clientService, PasswordEncoder passwordEncoder, EmployeeService employeeService) {
        this.authenticationManager = authenticationManager;
        this.clientService = clientService;
        this.passwordEncoder = passwordEncoder;
        this.employeeService = employeeService;
    }

    @PostMapping(path = "/register", produces = "application/json")
    @Transactional
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (clientService.existsByUsername(registerRequest.getUsername())) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Пользователь с таким именем уже существует");
            }
            if (registerRequest.getAge() < 12) {
                return ResponseEntity
                    .badRequest()
                    .body("Возраст должен быть не менее 12 лет");
            }
            Client newClient = new Client();
            newClient.setUsername(registerRequest.getUsername());
            newClient.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            newClient.setAge(registerRequest.getAge());
            newClient.setRole("ROLE_CLIENT"); 

            Client savedClient = clientService.saveClient(newClient);

            return ResponseEntity.ok(new LoginResponse(
                savedClient.getUsername(),
                savedClient.getRole(),
                savedClient.getAge()
            ));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Произошла ошибка при регистрации");
        }
    }



    @PostMapping(path = "/login", produces = "application/json")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request,  HttpServletRequest httpRequest) {
        try {
            System.out.println("Попытка входа: " + request.getUsername());

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );

            System.out.println("Аутентификация успешна. Роли: " + authentication.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            httpRequest.getSession(true).setAttribute(
                "SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            Client client = clientService.findByUsername(request.getUsername());
            if (client == null) {
                System.out.println("Пользователь не найден");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            return ResponseEntity.ok(new LoginResponse(
                client.getUsername(),
                client.getRole(),
                client.getAge()
            ));
        } catch (Exception e) {
            System.out.println("Ошибка аутентификации: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(path = "/employee/login", produces = "application/json")
    public ResponseEntity<LoginResponse> loginEmployee(@RequestBody LoginRequest request,  HttpServletRequest httpRequest) {
        try {
            System.out.println("Попытка входа: " + request.getUsername());

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );

            System.out.println("Аутентификация успешна. Роли: " + authentication.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            httpRequest.getSession(true).setAttribute(
                "SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            Employee employee = employeeService.findByUsername(request.getUsername());
            if (employee == null) {
                System.out.println("Пользователь не найден");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            return ResponseEntity.ok(new LoginResponse(
                employee.getUsername(),
                employee.getRole(),
                employee.getAge()
            ));
        } catch (Exception e) {
            System.out.println("Ошибка аутентификации: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        
        SecurityContextHolder.clearContext();
        
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath(request.getContextPath());
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        
        return ResponseEntity.ok().build();
    }

    // @PostMapping("/logout")
    // public ResponseEntity<?> logout(HttpServletRequest request) {
    //     HttpSession session = request.getSession(false);
    //     if (session != null) {
    //         session.invalidate();
    //     }
    //     SecurityContextHolder.clearContext();
    //     return ResponseEntity.ok().build();
    // }

    @GetMapping("/me")
    public ResponseEntity<LoginResponse> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(null);
        }

        Client client = clientService.findByUsername(authentication.getName());
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList())
                .get(0);

        return ResponseEntity.ok(new LoginResponse(
            client.getUsername(),
            role,
            client.getAge()
        ));
    }
}
