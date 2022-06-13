package fyp.springboot.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.*;

@Entity
@Table(name = "campaigns")
public class Campaign {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "campaignName")
  @NotNull(message = "Please Enter A Campaign Name")
  private String campaignName;

  @Column(name = "deadline")
  private Date deadline;
  
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private User user;

  @Column(name = "status")
  @Value("${some.key:0}")
  private int status;

  public Campaign() {

  }

  public Campaign(String campaignName, Date deadline, User user, int status) {
    this.campaignName = campaignName;
    this.deadline = deadline;
    this.user = user;
    this.status = status;
  }

  public long getCampaignId() {
    return id;
  }

  public String getCampaignName() {
    return campaignName;
  }

  public void setCampaignName(String campaignName) {
    this.campaignName = campaignName;
  }

  public Date getDeadline() {
    return deadline;
  }

  public void setDeadline(Date deadline) {
    this.deadline = deadline;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public int initStatus() {
    return status = 0;
  }

  public void setStatus(int initStatus) {
    this.status = initStatus;
  }

  @Override
  public String toString() {
    return "Campaign [id=" + id + ", campaignName=" + campaignName + ", deadline=" + deadline + ", status=" + status + "]";
  }

}
