package fyp.evoting.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fyp.evoting.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
