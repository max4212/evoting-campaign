package fyp.evoting.backend.controller;

import java.sql.Timestamp;
import java.util.*;

import fyp.evoting.backend.model.*;
import fyp.evoting.backend.repository.VoterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import fyp.evoting.backend.exception.ResourceNotFoundException;
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

	@Autowired
	private VoterRepository voterRepository;
	
	// get all campaigns
	@GetMapping("/campaigns")
	public List<Campaign> getAllCampaigns(){
		return campaignRepository.findAll();
	}		
	
	// create campaign in user rest api
	@PostMapping("/users/{user_id}/campaigns")
	public Campaign createCampaign(@PathVariable(value = "user_id") Long user_id, @RequestBody CampaignRequest campaignRequest) {
	    List<Option> inputOptions = campaignRequest.getOptions();
		List<VoterRequest> inputVoters = campaignRequest.getVoters();
		List<Voter> saveVoter = new ArrayList<>();
		Optional<User> user = userRepository.findById(user_id);


		Campaign saveCampaign = new Campaign();
		if(campaignRequest.getId()!=0)
		{
			saveCampaign.setId(campaignRequest.getId());

		}
		if(user.isPresent()){
			saveCampaign.setUser(user.get());
		}
		if(null!=campaignRequest.getCampaignStatus()) {
			saveCampaign.setCampaignStatus(campaignRequest.getCampaignStatus());
		}

		if(null!=campaignRequest.getCampaignName()) {
			saveCampaign.setCampaignName(campaignRequest.getCampaignName());
		}

		if(null!=campaignRequest.getDeadline()) {
			saveCampaign.setDeadline(campaignRequest.getDeadline());
		}

		if(null!=campaignRequest.getDeadline()) {
			saveCampaign.setUser(saveCampaign.getUser());
		}
		saveCampaign.setOptions(null);
		saveCampaign.setVoters(null);

		if(campaignRequest.getId()==0) {
			campaignRepository.saveAndFlush(saveCampaign);
		}
		for(Option option: inputOptions){
			option.setCampaign(saveCampaign);
		}
		for(VoterRequest voter: inputVoters){

			Optional<User> userVoter = userRepository.findById(voter.getUser());
			if(userVoter != null)
			{
				Voter voterSave = new Voter();
				voterSave.setUser(userVoter.get());
				voterSave.setCampaign(saveCampaign);
				voterSave.setVoteStatus(voter.getVoteStatus());
				saveVoter.add(voterSave);

			}
			//voter.setCampaign(campaignRequest);
		}
		saveCampaign.setOptions(inputOptions);
		saveCampaign.setVoters(saveVoter);
		if(campaignRequest.getId() ==0) {
			campaignRepository.saveAndFlush(saveCampaign);
		}
		else
		{
			campaignRepository.save(saveCampaign);
		}
		return saveCampaign;
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
	public ResponseEntity<Campaign> updateCampaign(@PathVariable Long id, @RequestBody CampaignRequest campaignDetails){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		campaignDetails.setId(id);
		//campaignRepository.delete(campaign);
		Campaign updatedCampaign = createCampaign(campaign.getUser().getId(), campaignDetails);


		/*List<Option> optionsList = campaignDetails.getOptions();
		if(null != campaignDetails.getOptions() && campaignDetails.getOptions().size()>0) {

		//	List<Voter> votersList = campaignDetails.getVoters();

			for (Option option : optionsList) {
				option.setCampaign(campaign);
			}
		}
	/*	List<Voter> voterList = new ArrayList<>();
		if(null != campaignDetails.getVoters() && campaignDetails.getVoters().size()>0) {
			voterList = campaignDetails.getVoters();
			for (Voter voter : voterList)
			{
				voter.setCampaign(campaign);
			}
		}*//*
		campaign.setCampaignName(campaignDetails.getCampaignName());
		campaign.setDeadline(campaignDetails.getDeadline());
		campaign.setCampaignStatus(campaignDetails.getCampaignStatus());
		campaign.setOptions(optionsList);
	//	campaign.setVoters(voterList);
		Campaign updatedCampaign = campaignRepository.save(campaign);*/
		return ResponseEntity.ok(updatedCampaign);
	}
	
	// launch campaign rest api	
	@PutMapping("/campaigns/{id}/launchCampaign")
	public ResponseEntity<Campaign> launchCampaign(@PathVariable Long id){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		
		campaign.setCampaignStatus(CampaignStatus.Pending);

		Campaign launchedCampaign = campaignRepository.save(campaign);
		return ResponseEntity.ok(launchedCampaign);
	}
	
	// close campaign simulation rest api	
	@PutMapping("/campaigns/{id}/closeCampaign")
	public ResponseEntity<Campaign> closeCampaign(@PathVariable Long id){
		Campaign campaign = campaignRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));
		
		campaign.setCampaignStatus(CampaignStatus.Closed);

		Campaign closedCampaign = campaignRepository.save(campaign);
		return ResponseEntity.ok(closedCampaign);
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


	@GetMapping("/campaigns/voters/{campaignId}")
	public ResponseEntity<List<User>> getVotersByCampaignId(@PathVariable(value = "campaignId") Long campaign) {
		List<Voter> voters = voterRepository.findByCampaignId(campaign);
		List<User> users = new ArrayList<>();
		if(voters != null && voters.size()>0) {

			for (Voter voter : voters) {
				User user = new User();
				if(null != voter.getUser()) {
					user = voter.getUser();
					users.add(user);
				}

			}
		}

		return ResponseEntity.ok(users);
	}




		
}