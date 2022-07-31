package fyp.evoting.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@NoArgsConstructor
@Data
public class CampaignRequest {

    private long id = 0;

    private String campaignName;

    private Date deadline;

    private CampaignStatus campaignStatus = CampaignStatus.Open;

    //private User user;

    private List<Option> options = new ArrayList<>();

    private List<VoterRequest> voters = new ArrayList<>();
}
