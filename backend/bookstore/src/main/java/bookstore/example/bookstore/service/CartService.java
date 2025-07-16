package bookstore.example.bookstore.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookstore.example.bookstore.model.Book;
import bookstore.example.bookstore.model.Cart;
import bookstore.example.bookstore.model.Client;
import bookstore.example.bookstore.repository.BookRepo;
import bookstore.example.bookstore.repository.CartRepo;
import bookstore.example.bookstore.repository.ClientRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepo cartRepo;
    private final BookRepo bookRepo;
    private final ClientRepo clientRepo;
    
    public List<Cart> getUserCart(String username) {
        Client client = clientRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Client not found"));
        return cartRepo.findByClient(client);
    }
    
    public Cart addToCart(String username, Long bookId, int quantity) {
        Client client = clientRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Client not found"));
        Book book = bookRepo.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
            
        Cart existingCart = cartRepo.findByClientAndBook(client, book)
            .orElse(null);
            
        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            return cartRepo.save(existingCart);
        } else {
            Cart newCart = new Cart();
            newCart.setClient(client);
            newCart.setBook(book);
            newCart.setQuantity(quantity);
            return cartRepo.save(newCart);
        }
    }
    
    @Transactional
    public Cart updateQuantity(Long cartId, int change) {
        Cart cart = cartRepo.findById(cartId)
            .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + cartId));
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (!cart.getClient().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Unauthorized cart update");
        }
        
        int newQuantity = cart.getQuantity() + change;
        if (newQuantity < 1) {
            cartRepo.delete(cart);
            return null;
        }
        
        cart.setQuantity(newQuantity);
        return cartRepo.save(cart);
    }
    public void removeFromCart(Long cartId) {
        cartRepo.deleteById(cartId);
    }
    
    @Transactional
    public void clearCart(String username) {
        try {
            Client client = clientRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Client not found"));
            List<Cart> items = cartRepo.findByClient(client);
            cartRepo.deleteAll(items);
        } catch (Exception e) {
            System.out.println("Error clearing cart for user " + username + " " + e);
            throw e;
        }
    }
}