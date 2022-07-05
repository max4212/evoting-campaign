package fyp.evoting.backend.model;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="user_name", nullable = false)
	private String userName;
	
	@Column(name="user_password", nullable = false)	
	private String userPW;
	
	@Column(name="email", nullable = false)	
	private String email;
	
	@Column(name="user_type")
	@Enumerated(EnumType.STRING)
    private UserType userType = UserType.Voter;
	
	public User() {
		
	}
	
	public User(String userName, String userPW, String email, UserType userType) {
		super();
		this.userName = userName;
		this.userPW = userPW;
		this.email = email;
		this.userType = userType;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPW() {
		return userPW;
	}
	public void setUserPW(String userPW) {
		this.userPW = userPW;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	
	
}
