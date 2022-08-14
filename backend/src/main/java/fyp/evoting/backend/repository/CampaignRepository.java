package fyp.evoting.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import fyp.evoting.backend.model.Campaign;
import fyp.evoting.backend.model.CampaignStatus;
import fyp.evoting.backend.model.User;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long>{
	List<Campaign> findByUserId(Long postUserId);
	
	List<Campaign> findByCampaignStatus(CampaignStatus campaignStatus);

	@Query("select c from Campaign c where c.deadline <= :date")
	List<Campaign> getCampaignByDeadline(Date date);

	@Transactional
	void deleteByUserId(long user_id);
}
