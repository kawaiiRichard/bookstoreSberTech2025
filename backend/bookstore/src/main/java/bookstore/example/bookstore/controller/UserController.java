package bookstore.example.bookstore.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.example.bookstore.model.User;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    
    @PostMapping("/add")
    User addUser(@RequestBody User user) {
        return user;
    }

}
