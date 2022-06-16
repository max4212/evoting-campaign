package fyp.evoting.backend.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fyp.evoting.backend.model.User;
import fyp.evoting.backend.model.UserType;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	List<User> findByUserType(UserType userType);
	
}
