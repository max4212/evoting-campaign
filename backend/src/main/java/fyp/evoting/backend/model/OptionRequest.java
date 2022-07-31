package fyp.evoting.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OptionRequest {
    private long id;
    private String optionDesc;
    private long campaign;
    private long voteCount = 0;

}
