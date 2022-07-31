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
}
