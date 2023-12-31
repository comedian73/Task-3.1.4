package ru.kata.spring.boot_security.demo.repo;

import org.springframework.data.repository.CrudRepository;
import ru.kata.spring.boot_security.demo.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
     User findUserByUsername(String username);
}
