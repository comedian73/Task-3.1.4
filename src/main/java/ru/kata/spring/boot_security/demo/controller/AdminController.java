package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @GetMapping
    public String userList(Authentication auth, Model model) {
        auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) userService.loadUserByUsername(auth.getName());
        model.addAttribute("listRole", userService.getAllRoles());
        model.addAttribute("userAdd", new User());
        model.addAttribute("list", userService.getAllUsers());
        model.addAttribute("user", user);
        return "admin";
    }

    @PostMapping (value = "/delete")
    public String deleteUser(@RequestParam(name = "del") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @PostMapping(value = "/edit")
    public String saveEdit (@ModelAttribute("userAdd") @Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            return "admin";
        }

        userService.updateUser(user);
        return "redirect:/admin";
    }

    @PostMapping(value = "/addUser")
    public String saveAddUser(@ModelAttribute("userAdd") @Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            return "admin";
        }
        userService.saveUser(user);
        return "redirect:/admin";
    }
}