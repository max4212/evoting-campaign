package fyp.evoting.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fyp.evoting.backend.exception.ResourceNotFoundException;
import fyp.evoting.backend.model.Campaign;
import fyp.evoting.backend.model.CampaignStatus;
import fyp.evoting.backend.model.Option;
import fyp.evoting.backend.model.User;
import fyp.evoting.backend.model.Voter;
import fyp.evoting.backend.repository.CampaignRepository;
import fyp.evoting.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CampaignController {

	@Autowired
	private CampaignRepository campaignRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	// get all campaigns
	@GetMapping("/campaigns")
	public List<Campaign> getAllCampaigns(){
		return campaignRepository.findAll();
	}		
	
	// create campaign in user rest api
	@PostMapping("/users/{user_id}/campaigns")
	public Campaign createCampaign(@PathVariable(value = "user_id") Long user_id, @RequestBody Campaign campaignRequest) {
	    Campaign campaign = userRepository.findById(user_id).map(user -> {
	    	campaignRequest.setUser(user);
	    	return campaignRepository.save(campaignRequest);
	    }).orElseThrow(() -> new ResourceNotFoundException("User " + user_id + " Not Found"));
	
	    return campaignRepository.save(campaign);
	}

	// create campaign test rest api
	@PostMapping("/campaigns")
	public Campaign testCreateCampaign(@RequestBody Campaign campaign) {
		return campaignRepository.save(campaign);
	}
	
	// get campaign by id rest api
	@GetMapping("/campaigns/{id}")
	public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		return ResponseEntity.ok(campaign);
	}
	
	// get all campaigns by user ids rest api
	@GetMapping("/users/{user_id}/campaigns")
	public ResponseEntity<List<Campaign>> getAllCampaignsByUserId(@PathVariable(value = "user_id") Long user_id) {
	    if (!userRepository.existsById(user_id)) {
	      throw new ResourceNotFoundException("User " + user_id + " Not Found");
	    }
	
	    List<Campaign> campaigns = campaignRepository.findByUserId(user_id);
	    return ResponseEntity.ok(campaigns);
	}
	
	// get campaign by campaignStatus rest api
	@GetMapping("/campaigns/findByCampaignStatus/{campaignStatus}")
	public List<Campaign> findByCampaignStatus(@PathVariable("campaignStatus") CampaignStatus campaignStatus) {
		return campaignRepository.findByCampaignStatus(campaignStatus);
	}
	
	// update campaign rest api	
	@PutMapping("/campaigns/{id}")
	public ResponseEntity<Campaign> updateCampaign(@PathVariable Long id, @RequestBody Campaign campaignDetails){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		
		campaign.setCampaignName(campaignDetails.getCampaignName());
		campaign.setDeadline(campaignDetails.getDeadline());
		campaign.setCampaignStatus(campaignDetails.getCampaignStatus());
		
		Campaign updatedCampaign = campaignRepository.save(campaign);
		return ResponseEntity.ok(updatedCampaign);
	}
	
	// launch campaign rest api	
	@PutMapping("/campaigns/{id}/launchCampaign/Pending")
	public ResponseEntity<Campaign> launchCampaign(@PathVariable Long id, @RequestBody Campaign campaignDetails){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		
		campaign.setCampaignStatus(campaignDetails.getCampaignStatus());
		
		Campaign launchedCampaign = campaignRepository.save(campaign);
		return ResponseEntity.ok(launchedCampaign);
	}
	
	// delete campaign rest api
	@DeleteMapping("/campaigns/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCampaign(@PathVariable Long id){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		
		campaignRepository.delete(campaign);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	//delete campaign by user rest api
	@DeleteMapping("/users/{user_id}/campaigns")
	  public ResponseEntity<Map<String, Boolean>>deleteAllCampaignsOfUser(@PathVariable(value = "user_id") Long user_id) {
		User user = userRepository.findById(user_id)
				.orElseThrow(() -> new ResourceNotFoundException("User " + user_id + " Not Found"));

	    campaignRepository.deleteByUserId(user_id);
	    Map<String, Boolean> response =  new HashMap<>();
	    response.put("deleted", Boolean.TRUE);
	    return ResponseEntity.ok(response);
	}
		
}