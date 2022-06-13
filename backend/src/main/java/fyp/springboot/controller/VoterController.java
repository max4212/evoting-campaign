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
import fyp.springboot.entity.Voter;
import fyp.springboot.repository.VoterRepository;
import fyp.springboot.repository.UserRepository;
import fyp.springboot.repository.CampaignRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class VoterController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CampaignRepository campaignRepository;

  @Autowired
  private VoterRepository voterRepository;

  @GetMapping("/users/{id}/voters/{id}")
  public ResponseEntity<List<Voter>> getAllVotersByUserId(@PathVariable(value = "id") Long id) {
    if (!userRepository.existsById(id)) {
      throw new ResourceNotFoundException("User " + id + " Not Found");
    }

    List<Voter> voters = voterRepository.findByUserId(id);
    return new ResponseEntity<>(voters, HttpStatus.OK);
  }

  @GetMapping("/campaigns/{id}/voters/{id}")
  public ResponseEntity<List<Voter>> getAllVotersByCamapaignId(@PathVariable(value = "id") Long id) {
    if (!userRepository.existsById(id)) {
      throw new ResourceNotFoundException("Campaign " + id + " Not Found");
    }

    List<Voter> voters = voterRepository.findByCampaignId(id);
    return new ResponseEntity<>(voters, HttpStatus.OK);
  }
  
  @GetMapping("/voters/{id}")
  public ResponseEntity<Voter> getVoterById(@PathVariable(value = "id") Long id) {
    Voter voter = voterRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Voter " + id + " Not Found"));

    return new ResponseEntity<>(voter, HttpStatus.OK);
  }

  @PostMapping("/campaigns/{id}/voters/{id}")
  public ResponseEntity<Voter> addVoterToCampaign(@PathVariable(value = "id") Long id,
      @RequestBody Voter voterRequest) {
    Voter voter = campaignRepository.findById(id).map(campaign -> {
      voterRequest.setCampaign(campaign);
      return voterRepository.save(voterRequest);
    }).orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));

    return new ResponseEntity<>(voter, HttpStatus.CREATED);
  }

  @DeleteMapping("/voters/{id}")
  public ResponseEntity<HttpStatus> deleteVoter(@PathVariable("id") long id) {
    voterRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/deletedUser/{id}/deleteVoters/{id}")
  public ResponseEntity<List<Voter>> deleteVoterByUser(@PathVariable(value = "id") Long id) {
    if (!userRepository.existsById(id)) {
      throw new ResourceNotFoundException("User " + id + " Not Found");
    }

    voterRepository.deleteByUserId(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/deletedCampaign/{id}/deleteVoter/{id}")
  public ResponseEntity<List<Voter>> deleteVoterByCampaign(@PathVariable(value = "id") Long id) {
    if (!userRepository.existsById(id)) {
      throw new ResourceNotFoundException("Campaign " + id + " Not Found");
    }

    voterRepository.deleteByUserId(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
