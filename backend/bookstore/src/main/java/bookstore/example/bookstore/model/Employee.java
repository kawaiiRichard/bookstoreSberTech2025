package bookstore.example.bookstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
@PrimaryKeyJoinColumn(name = "id")
public class Employee extends User {
    private Double salary;

    public Employee() {
        super();
    }

    public Employee(Long id, String username, String password, int age, String role, Double salary) {
        super(id, username, password, age, role);
        this.salary = salary;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}