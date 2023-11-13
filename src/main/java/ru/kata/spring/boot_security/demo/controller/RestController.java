package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequiredArgsConstructor
public class RestController {

    private final UserService userService;

    @GetMapping("/users-list")
    public List<User> listUser() {
        return userService.getAllUsers();
    }

    @GetMapping("/authentication-user")
    public User authUser() {
       Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) userService.loadUserByUsername(auth.getName());
    }

    @GetMapping("/role-list")
    public List<Role> listRole() {
        return userService.getAllRoles();
    }

    @DeleteMapping("/user/delete/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @PostMapping(value = "/addNewUser", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addNewUser(@ModelAttribute User user) {
        userService.saveUser(user);
    }

    @PostMapping(value = "/editUser")
    public void editUser(@ModelAttribute User user) {
        userService.updateUser(user);
    }
}
