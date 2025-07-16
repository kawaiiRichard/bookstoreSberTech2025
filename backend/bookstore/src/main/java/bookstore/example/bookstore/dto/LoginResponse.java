package bookstore.example.bookstore.dto;

public record LoginResponse(
    String username,
    String role,
    int age
) {}