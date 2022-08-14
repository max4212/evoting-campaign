package fyp.evoting.backend.model;

import javax.persistence.*;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonFormat;
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
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="closing_date", nullable = false)	
	private Date deadline;
	
	@Column(name="campaign_status")
	@Enumerated(EnumType.STRING)
   	private CampaignStatus campaignStatus = CampaignStatus.Open;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	@OneToMany(
            mappedBy = "campaign",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Option> options = new ArrayList<>();
	
	@OneToMany(
            mappedBy = "campaign",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Voter> voters = new ArrayList<>();
	
	public Campaign() {
		
	}
	
	public Campaign(String campaignName, Date deadline, CampaignStatus campaignStatus, User user,
			List<Option> options, List<Voter> voters) {
		super();
		this.campaignName = campaignName;
		this.deadline = deadline;
		this.campaignStatus = campaignStatus;
		this.user = user;
		this.options = options;
		this.voters = voters;
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
	
	public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
	
	public void addOption(Option option) {
        options.add(option);
        option.setCampaign(this);
    }

    public void removeOption(Option option) {
        options.remove(option);
        option.setCampaign(null);
    }
	
	public List<Voter> getVoters() {
        return voters;
    }

    public void setVoters(List<Voter> voters) {
        this.voters = voters;
    }
	
	public void addVoter(Voter voter) {
        voters.add(voter);
        voter.setCampaign(this);
    }

    public void removeVoter(Voter voter) {
        voters.remove(voter);
        voter.setCampaign(null);
    }
	
}
