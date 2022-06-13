package fyp.springboot.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fyp.springboot.exception.ResourceNotFoundException;
import fyp.springboot.entity.User;
import fyp.springboot.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String userName) {
    List<User> users = new ArrayList<User>();

    if (userName == null)
      userRepository.findAll().forEach(users::add);
    else
      userRepository.findByUserNameContaining(userName).forEach(users::add);

    if (users.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User " + id + " Not Found"));

    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @PostMapping("/users/{id}")
  public ResponseEntity<User> addUser(@RequestBody User user) {
    User _user = userRepository.save(new User(user.getPassword(), user.getUserName(), user.getEmail(), 0));
    return new ResponseEntity<>(_user, HttpStatus.CREATED);
  }

  @PutMapping("/users/{id}")
  public ResponseEntity<User> editUser(@PathVariable("id") long id, @RequestBody User user) {
    User _user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User " + id + " Not Found"));

    _user.setPassword(user.getPassword());
    _user.setUserName(user.getUserName());
    _user.setEmail(user.getEmail());
    _user.setUserType(user.initUserType());
    
    return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
    userRepository.deleteById(id);
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<HttpStatus> deleteAllUsers() {
    userRepository.deleteAll();
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @GetMapping("/users/0")
  public ResponseEntity<List<User>> findByUserType() {
    List<User> users = userRepository.findByUserType(0);

    if (users.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    return new ResponseEntity<>(users, HttpStatus.OK);
  }
}
