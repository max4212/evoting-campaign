package fyp.evoting.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fyp.evoting.backend.exception.ResourceNotFoundException;
import fyp.evoting.backend.model.Campaign;
import fyp.evoting.backend.repository.CampaignRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CampaignController {

	@Autowired
	private CampaignRepository campaignRepository;
	
	// get all campaigns
	@GetMapping("/campaigns")
	public List<Campaign> getAllCampaigns(){
		return campaignRepository.findAll();
	}		
	
	// create campaign rest api
	@PostMapping("/campaigns")
	public Campaign createCampaign(@RequestBody Campaign campaign) {
		return campaignRepository.save(campaign);
	}
	
	// get campaign by id rest api
	@GetMapping("/campaigns/{id}")
	public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not exist with id :" + id));
		return ResponseEntity.ok(campaign);
	}
	
	// update campaign rest api
	
	@PutMapping("/campaigns/{id}")
	public ResponseEntity<Campaign> updateCampaign(@PathVariable Long id, @RequestBody Campaign campaignDetails){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not exist with id :" + id));
		
		campaign.setCampaignName(campaignDetails.getCampaignName());
		campaign.setDeadline(campaignDetails.getDeadline());
		campaign.setCampaignStatus(campaignDetails.getCampaignStatus());
		
		Campaign updatedCampaign = campaignRepository.save(campaign);
		return ResponseEntity.ok(updatedCampaign);
	}
	
	// delete campaign rest api
	@DeleteMapping("/campaigns/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCampaign(@PathVariable Long id){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not exist with id :" + id));
		
		campaignRepository.delete(campaign);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}