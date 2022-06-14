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
import fyp.springboot.entity.Option;
import fyp.springboot.repository.OptionRepository;
import fyp.springboot.repository.CampaignRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class OptionController {

  @Autowired
  private CampaignRepository campaignRepository;

  @Autowired
  private OptionRepository optionRepository;

  @GetMapping("/campaigns/{id}/options")
  public ResponseEntity<List<Option>> getAllOptionsByCampaignId(@PathVariable(value = "id") Long id) {
    if (!campaignRepository.existsById(id)) {
      throw new ResourceNotFoundException("Campaign " + id + " Not Found");
    }

    List<Option> options = optionRepository.findByCampaignId(id);
    return new ResponseEntity<>(options, HttpStatus.OK);
  }

  @GetMapping("/options/{id}")
  public ResponseEntity<Option> getOptionById(@PathVariable(value = "id") Long id) {
    Option option = optionRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Option " + id + " Not Found"));

    return new ResponseEntity<>(option, HttpStatus.OK);
  }

  @PostMapping("/campaigns/{id}/options")
  public ResponseEntity<Option> addOptionToCampaign(@PathVariable(value = "id") Long id,
      @RequestBody Option optionRequest) {
    Option option = campaignRepository.findById(id).map(campaign -> {
      optionRequest.setCampaign(campaign);
      return optionRepository.save(optionRequest);
    }).orElseThrow(() -> new ResourceNotFoundException("Campaign " + id + " Not Found"));

    return new ResponseEntity<>(option, HttpStatus.CREATED);
  }

  @PutMapping("/options/{id}")
  public ResponseEntity<Option> editOption(@PathVariable("id") long id, @RequestBody Option optionRequest) {
    Option option = optionRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Option " + id + " Not Found"));

    option.setOption(optionRequest.getOption());
    option.setCampaign(optionRequest.getCampaign());
    option.setCount(optionRequest.initCount());

    return new ResponseEntity<>(optionRepository.save(option), HttpStatus.OK);
  }

  @DeleteMapping("/options/{id}")
  public ResponseEntity<HttpStatus> deleteOption(@PathVariable("id") long id) {
    optionRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/campaigns/{id}/options")
  public ResponseEntity<List<Option>> deleteOptionsInCampaign(@PathVariable(value = "id") Long id) {
    if (!campaignRepository.existsById(id)) {
      throw new ResourceNotFoundException("Campaign " + id + " Not Found");
    }

    optionRepository.deleteByCampaignId(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
