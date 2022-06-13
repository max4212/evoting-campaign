package fyp.springboot.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.beans.factory.annotation.*;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "password")
  @NotNull(message = "Please Enter Password")
  private String password;

  @Column(name = "userName")
  @NotNull(message = "Please Enter Username")
  private String userName;

  @Column(name = "email")
  @NotNull(message = "Please Enter Email")
  private String email;

  @Column(name = "userType")
  @Value("${some.key:0}")
  private int userType;

  public User() {

  }

  public User(String password, String userName, String email, int userType) {
	this.password = password;
	this.userName = userName;
    this.email = email;
    this.userType = userType;
  }

  public long getUserId() {
    return id;
  }
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public int initUserType() {
    return userType = 0;
  }

  public void setUserType(int initUserType) {
    this.userType = initUserType;
  }

  @Override
  public String toString() {
    return "User [id=" + id + ", userName=" + userName + ", email=" + email + ", userType=" + userType + "]";
  }

}
