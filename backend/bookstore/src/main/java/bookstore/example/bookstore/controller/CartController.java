package bookstore.example.bookstore.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.model.Cart;
import bookstore.example.bookstore.service.CartService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    
    @GetMapping
    public ResponseEntity<List<Cart>> getCart(Authentication authentication) {
        return ResponseEntity.ok(
            cartService.getUserCart(authentication.getName())
        );
    }
    
    @PostMapping("/add/{bookId}")
    public ResponseEntity<Cart> addToCart(
        @PathVariable Long bookId,
        @RequestParam(defaultValue = "1") int quantity,
        Authentication authentication
    ) {
        return ResponseEntity.ok(
            cartService.addToCart(authentication.getName(), bookId, quantity)
        );
    }
    
    @PutMapping("/update/{cartId}")
    public ResponseEntity<?> updateQuantity(
        @PathVariable Long cartId,
        @RequestParam int change,
        Authentication authentication
    ) {
        try {
            Cart updatedCart = cartService.updateQuantity(cartId, change);
            if (updatedCart == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(updatedCart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
        }
    }
    
    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<?> removeFromCart(
        @PathVariable Long cartId,
        Authentication authentication
    ) {
        cartService.removeFromCart(cartId);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return ResponseEntity.ok().build();
    }
}
