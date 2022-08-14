package fyp.evoting.backend.scheduler;

import fyp.evoting.backend.model.Campaign;
import fyp.evoting.backend.model.CampaignStatus;
import fyp.evoting.backend.model.User;
import fyp.evoting.backend.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component

public class schedulerCampaign {

    @Autowired
    private CampaignRepository campaignRepository;

    // every 24 hour this will run //cron (sec min hrs week month year)
    // @Scheduled(cron = "0 * 23 * * *")

    // if you want to test uncomment this
    @Scheduled(fixedRate = 10000)

    public void checkDeadlineScheduler() throws ParseException {
        // Date currentTime = new Date();
        // change format according to the save dates
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(timeStamp);

        List<Campaign> campaigns = campaignRepository.getCampaignByDeadline(date);

        for (Campaign campaign : campaigns) {
            campaign.setCampaignStatus(CampaignStatus.Closed);
            campaignRepository.saveAndFlush(campaign);
        }

    }

}
