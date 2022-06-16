package fyp.evoting.backend.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.*;

@Entity
@Table(name="campaigns")
public class Campaign {
	@Id
	@Column(name="campaign_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="campaign_name", nullable = false)
	private String campaignName;
	@Column(name="closing_date", nullable = false)	
	private Date deadline;
	@Column(name="campaign_status")
	@Enumerated(EnumType.ORDINAL)
   	private CampaignStatus campaignStatus = CampaignStatus.Open;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	User user;
	
	public Campaign() {
		
	}
	
	public Campaign(String campaignName, Date deadline, CampaignStatus campaignStatus, User user) {
		super();
		this.campaignName = campaignName;
		this.deadline = deadline;
		this.campaignStatus = campaignStatus;
		this.user = user;	
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public CampaignStatus getCampaignStatus() {
		return campaignStatus;
	}
	public void setCampaignStatus(CampaignStatus campaignStatus) {
		this.campaignStatus = campaignStatus;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
}
