package fyp.evoting.backend.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="voters")
public class Voter {
	@Id
	@Column(name="voter_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "campaign_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Campaign campaign;
	
	@Column(name="vote_status")
	@Enumerated(EnumType.STRING)
    private VoteStatus voteStatus = VoteStatus.Pending;
	
	public Voter() {
		
	}
	
	public Voter(User user, Campaign campaign, VoteStatus voteStatus) {
		super();
		this.user = user;
		this.campaign = campaign;	
		this.voteStatus = voteStatus;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public VoteStatus getVoteStatus() {
		return voteStatus;
	}
	public void setVoteStatus(VoteStatus voteStatus) {
		this.voteStatus = voteStatus;
	}
	
}
