package fyp.springboot.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import fyp.springboot.entity.Voter;

public interface VoterRepository extends JpaRepository<Voter, Long> {
  List<Voter> findByCampaignId(Long postCampaignId);

  List<Voter> findByUserId(Long postUserId);
  
  @Transactional
  void deleteByCampaignId(long campaign_id);

  @Transactional
  void deleteByUserId(long user_id);
}
