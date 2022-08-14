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
import fyp.evoting.backend.repository.CampaignRepository;
import fyp.evoting.backend.repository.OptionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OptionController {

	@Autowired
	private OptionRepository optionRepository;
	
	@Autowired 
	private CampaignRepository campaignRepository;
	
	// create options in campaign rest api
	@PostMapping("/campaigns/{campaign_id}/options")
	public Option createOption(@PathVariable(value = "campaign_id") Long campaign_id, @RequestBody Option optionRequest) {
	    Option option = campaignRepository.findById(campaign_id).map(campaign -> {
	    	optionRequest.setCampaign(campaign);
	    	return optionRepository.save(optionRequest);
	    }).orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaign_id + " Not Found"));
	
	    return optionRepository.save(option);
	}
	
	// get all options by campaign ids rest api
	@GetMapping("/campaigns/{campaign_id}/options")
	public ResponseEntity<List<Option>> getAllOptionsByCampaignId(@PathVariable(value = "campaign_id") Long campaign_id) {
	    if (!campaignRepository.existsById(campaign_id)) {
	      throw new ResourceNotFoundException("Campaign " + campaign_id + " Not Found");
	    }
	
	    List<Option> options = optionRepository.findByCampaignId(campaign_id);
	    return ResponseEntity.ok(options);
	}
		
	// update option rest api	
	@PutMapping("/options/{id}")
	public ResponseEntity<Option> updateOption(@PathVariable Long id, @RequestBody Option options){
		Option option = optionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Option " + id + " Not Found"));
		
		option.setOptionDesc(options.getOptionDesc());
		option.setVoteCount(options.getVoteCount());
		
		Option updatedOption= optionRepository.save(option);
		return ResponseEntity.ok(updatedOption);
	}

	// increment the selected option's vote count by one rest api
	@PutMapping("/campaigns/{campaign_id}/options")
	public ResponseEntity<List<Option>> voteOption(@PathVariable(value = "campaign_id") Long campaign_id, @RequestBody String choice){
		if (!campaignRepository.existsById(campaign_id)) {
		      throw new ResourceNotFoundException("Campaign " + campaign_id + " Not Found");
		    }
		
		List<Option> options = optionRepository.findByCampaignId(campaign_id);
		for (int i = 0; i < options.size(); i++) {
		    if(choice.equalsIgnoreCase(options.get(i).getOptionDesc())) 
		    {
		    	options.get(i).setVoteCount(options.get(i).getVoteCount()+1);
		    }
		}
		optionRepository.saveAll(options);
		return ResponseEntity.ok(options);
	}
	
	// delete option rest api
	@DeleteMapping("/options/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteOption(@PathVariable Long id){
		Option option = optionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Option " + id + " Not Found"));
		
		optionRepository.delete(option);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//delete option by campaign rest api
	@DeleteMapping("/campaigns/{campaign_id}/options")
	  public ResponseEntity<Map<String, Boolean>>deleteAllOptionsOfCampaign(@PathVariable(value = "campaign_id") Long campaign_id) {
		Campaign campaign = campaignRepository.findById(campaign_id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaign_id + " Not Found"));

	    optionRepository.deleteByCampaignId(campaign_id);
	    Map<String, Boolean> response =  new HashMap<>();
	    response.put("deleted", Boolean.TRUE);
	    return ResponseEntity.ok(response);
	}
	
}
