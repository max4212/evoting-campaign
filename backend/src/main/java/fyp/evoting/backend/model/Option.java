package fyp.evoting.backend.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="options")
public class Option {
	@Id
	@Column(name="option_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="option_desc", nullable = false)
	private String optionDesc;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "campaign_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Campaign campaign;
	
	@Column(name="vote_count", nullable = false)
	private long voteCount = 0;
	
	public Option() {
		
	}
	
	public Option(String optionDesc, Campaign campaign, long voteCount) {
		super();
		this.optionDesc = optionDesc;
		this.campaign = campaign;	
		this.voteCount = voteCount;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getOptionDesc() {
		return optionDesc;
	}
	public void setOptionDesc(String optionDesc) {
		this.optionDesc = optionDesc;
	}
	public Campaign getCampaign() {
		return campaign;
	}
	public void setCampaign(Campaign campaign) {
		this.campaign = campaign;
	}
	public long getVoteCount() {
		return voteCount;
	}
	public void setVoteCount(long voteCount) {
		this.voteCount = voteCount;
	}
	
}
