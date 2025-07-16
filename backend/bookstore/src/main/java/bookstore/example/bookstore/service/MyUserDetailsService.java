// package bookstore.example.bookstore.service;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import bookstore.example.bookstore.model.Client;
// import bookstore.example.bookstore.model.Employee;
// import bookstore.example.bookstore.repository.ClientRepo;
// import bookstore.example.bookstore.repository.EmployeeRepo;

// @Service
// public class MyUserDetailsService implements UserDetailsService {

//     private final EmployeeRepo employeeRepo;
//     private final ClientRepo clientRepo;

//     public MyUserDetailsService(EmployeeRepo employeeRepo, ClientRepo clientRepo) {
//         this.employeeRepo = employeeRepo;
//         this.clientRepo = clientRepo;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         Optional<Employee> employee = employeeRepo.findByUsername(username);
//         if (employee.isPresent()) {
//             return new org.springframework.security.core.userdetails.User(
//                 employee.get().getUsername(),
//                 employee.get().getPassword(),
//                 List.of(new SimpleGrantedAuthority("ROLE_EMPLOYEE"))
//             );
//         }

//         Optional<Client> client = clientRepo.findByUsername(username);
//         if (client.isPresent()) {
//             return new org.springframework.security.core.userdetails.User(
//                 client.get().getUsername(),
//                 client.get().getPassword(),
//                 List.of(new SimpleGrantedAuthority("ROLE_CLIENT"))
//             );
//         }

//         throw new UsernameNotFoundException("Пользователь не найден");
//     }
// }
