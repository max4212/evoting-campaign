package fyp.springboot.entity;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "voters")
public class Voter {
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private User user;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "campaign_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Campaign campaign;

  @Column(name = "status")
  @Value("${some.key:0}")
  private int status;
  
  public Voter() {
	  
  }
  
  public Voter(User user, Campaign campaign, int status) {
	this.user = user;
	this.campaign = campaign;
	this.status = status;
}

  public Long getVoterId() {
    return id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
	  
  public Campaign getCampaign() {
    return campaign;
  }

  public void setCampaign(Campaign campaign) {
    this.campaign = campaign;
  }
	  
  public int initStatus() {
	    return status = 0;
  }

  public void setStatus(int initStatus) {
    this.status = initStatus;
  }
  
  @Override
  public String toString() {
    return "Voter [id=" + id + ", user=" + user + ", campaign=" + campaign + ", status=" + status + "]";
  }
  
}
