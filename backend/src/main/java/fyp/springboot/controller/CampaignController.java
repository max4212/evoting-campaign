package fyp.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fyp.springboot.exception.ResourceNotFoundException;
import fyp.springboot.entity.Campaign;
import fyp.springboot.repository.CampaignRepository;
import fyp.springboot.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CampaignController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CampaignRepository campaignRepository;

  @GetMapping("/users/{id}/campaigns/{id}")
  public ResponseEntity<List<Campaign>> getAllCampaignsByUserId(@PathVariable(value = "id") Long id) {
    if (!userRepository.existsById(id)) {
      throw new ResourceNotFoundException("User " + id + " Not Found");
    }

    List<Campaign> campaigns = campaignRepository.findByUserId(id);
    return new ResponseEntity<>(campaigns, HttpStatus.OK);
  }

  @GetMapping("/campaigns/{id}")
  public ResponseEntity<Campaign> getCampaignById(@PathVariable(value = "id") Long id) {
    Campaign campaign = campaignRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));

    return new ResponseEntity<>(campaign, HttpStatus.OK);
  }

  @PostMapping("/users/{id}/campaign/{id}")
  public ResponseEntity<Campaign> addCampaignWithUser(@PathVariable(value = "id") Long id,
      @RequestBody Campaign campaignRequest) {
    Campaign campaign = userRepository.findById(id).map(user -> {
      campaignRequest.setUser(user);
      return campaignRepository.save(campaignRequest);
    }).orElseThrow(() -> new ResourceNotFoundException("User " + id + " Not Found"));

    return new ResponseEntity<>(campaign, HttpStatus.CREATED);
  }

  @PutMapping("/campaigns/{id}")
  public ResponseEntity<Campaign> editCampaign(@PathVariable("id") long id, @RequestBody Campaign campaignRequest) {
    Campaign campaign = campaignRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));

    campaign.setCampaignName(campaignRequest.getCampaignName());
    campaign.setDeadline(campaignRequest.getDeadline());
    campaign.setUser(campaignRequest.getUser());
    campaign.setStatus(campaignRequest.initStatus());

    return new ResponseEntity<>(campaignRepository.save(campaign), HttpStatus.OK);
  }

  @DeleteMapping("/campaigns/{id}")
  public ResponseEntity<HttpStatus> deleteCampaign(@PathVariable("id") long id) {
    campaignRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/deletedUser/{id}/deleteCampaigns/{id}")
  public ResponseEntity<List<Campaign>> deleteCampaignByUser(@PathVariable(value = "id") Long id) {
    if (!userRepository.existsById(id)) {
      throw new ResourceNotFoundException("User " + id + " Not Found");
    }

    campaignRepository.deleteByUserId(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
