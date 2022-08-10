package fyp.evoting.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
@Data
@NoArgsConstructor
public class VoterRequest {
    private long id;
    private long user;
    private long campaign;
    private VoteStatus voteStatus = VoteStatus.Pending;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUser() {
		return user;
	}
	public void setUser(long user) {
		this.user = user;
	}
	public long getCampaign() {
		return campaign;
	}
	public void setCampaign(long campaign) {
		this.campaign = campaign;
	}
	public VoteStatus getVoteStatus() {
		return voteStatus;
	}
	public void setVoteStatus(VoteStatus voteStatus) {
		this.voteStatus = voteStatus;
	}
}
