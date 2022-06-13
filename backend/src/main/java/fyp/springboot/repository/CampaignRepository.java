package fyp.springboot.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import fyp.springboot.entity.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
  List<Campaign> findByUserId(Long postUserId);
  
  List<Campaign> findByStatus(int status);

  List<Campaign> findByCampaignNameContaining(String campaignName);
  
  @Transactional
  void deleteByUserId(long user_id);
}
