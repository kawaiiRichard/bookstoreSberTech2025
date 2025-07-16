package bookstore.example.bookstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "client")
@PrimaryKeyJoinColumn(name = "id")
public class Client extends User{

    public Client() {
    }

    public Client(Long id, String username, String password, int age, String role) {
        super(id, username, password, age, role);
    }
    
}
