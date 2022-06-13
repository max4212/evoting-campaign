package fyp.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fyp.springboot.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByUserType(int userType);

  List<User> findByUserNameContaining(String userName);
}
