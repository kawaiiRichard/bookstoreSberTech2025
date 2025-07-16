package bookstore.example.bookstore.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.dto.BookRequest;
import bookstore.example.bookstore.model.Book;
import bookstore.example.bookstore.repository.BookRepo;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    BookRepo bookRepo;

    @PostMapping("/employee/add-book")
    Book addBook(@RequestBody Book book) {
        bookRepo.save(book);
        return book;
    }

    @GetMapping("/")
    List<Book> getAllBooks() {
        List<Book> book = bookRepo.findAll();
        return book;
    }

    @GetMapping("/public/books")
    public List<Book> getPublicBooks() {
        return bookRepo.findAll();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookRepo.findById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete-book/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            if (!bookRepo.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Книга не найден");
            }
            bookRepo.deleteById(id);
            return ResponseEntity.ok("Книга удалён");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при удалении книги: " + e.getMessage());
        }
    }

    @PutMapping("/update-book/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody BookRequest bookRequest) {
        try {
            Optional<Book> optionalBook = bookRepo.findById(id);
            if (optionalBook.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Книга не найден");
            }

            Book book = optionalBook.get();
            
            book.setTitle(bookRequest.getTitle());
            book.setAuthor(bookRequest.getAuthor());
            book.setWeight(bookRequest.getWeight());
            book.setDescription(bookRequest.getDescription());
            book.setLanguage(bookRequest.getLanguage());
            book.setYear(bookRequest.getYear());
            book.setQuantOfPages(bookRequest.getQuantOfPages());
            book.setQuantInStock(bookRequest.getQuantInStock());
            book.setPrice(bookRequest.getPrice());
            book.setDiscount(bookRequest.getDiscount());

            Book updatedBook = bookRepo.save(book);
            return ResponseEntity.ok(updatedBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при обновлении книги: " + e.getMessage());
        }
    }

    @GetMapping("/books/total-stock")
    public ResponseEntity<Integer> getTotalBooksInStock() {
        List<Book> books = bookRepo.findAll();

        int totalInStock = books.stream()
            .mapToInt(Book::getQuantInStock) 
            .sum();

        return ResponseEntity.ok(totalInStock);
    }
}
