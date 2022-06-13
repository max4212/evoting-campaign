package fyp.springboot.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import fyp.springboot.entity.Option;

public interface OptionRepository extends JpaRepository<Option, Long> {
  List<Option> findByCampaignId(Long postCampaignId);
  
  @Transactional
  void deleteByCampaignId(long campaign_id);

}
