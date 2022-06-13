package fyp.springboot.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "options")
public class Option {
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "option")
  @NotNull(message = "Please Enter Option")
  private String option;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "campaign_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Campaign campaign;

  @Column(name = "count")
  @Value("${some.key:0}")
  private int count;
  
  public Option() {
	  
  }
  
  public Option(String option, Campaign campaign, int count) {
	this.option = option;
	this.campaign = campaign;
	this.count = count;
}

public Long getOptionId() {
    return id;
  }

  public String getOption() {
    return option;
  }

  public void setOption(String option) {
    this.option = option;
  }

  public Campaign getCampaign() {
    return campaign;
  }

  public void setCampaign(Campaign campaign) {
    this.campaign = campaign;
  }

  public int initCount() {
	    return count = 0;
  }

  public void setCount(int initCount) {
    this.count = initCount;
  }
  
  @Override
  public String toString() {
    return "Option [id=" + id + ", option=" + option + ", campaign=" + campaign + ", count=" + count + "]";
  }
  
}
