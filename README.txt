
kill tasks on port 8080 / 8081:
in terminal, enter command: netstat -ano | findstr 8080 (change '8080' to existing port no.)
output will display 'TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       21656'
enter command: taskkill /PID 21656 /F (change '21656' based on output)

create new database 'evoting' on port 3306

import projects from git > existing local repository > selec file

run as spring boot app

mysql workspace will insert tables in database 'evoting'

API Mapping
@PostMapping addUser("/addUser")					{UserController  	Line 56}
@PostMapping addCampaignWithUser("/user/{id}/addCampaign")		{CampaignController	Line 55}
@PostMapping addOptionToCampaign("/campaign/{id}/addOption")		{OptionController 	Line 52}
@PostMapping addVoterToCampaign("/campaign/{id}/addVoter")			{VoterController	Line 66}

@GetMapping getAllUsers("/allUsers")					{UserController 	Line 32}
@GetMapping getUserById("/user/{id}")					{UserController 	Line 48}
@GetMapping getAllCampaignByUserId("/user/{id}/allCampaigns")		{CampaignController	Line 37}
@GetMapping getCampaignById("/campaign/{id}")				{CampaignController	Line 47}
@GetMapping getAllOptionsByCampaignId("/campaign/{id}/allOptions")		{OptionController 	Line 34}
@GetMapping getOptionById("/option/{id}")				{OptionController	Line 44}
@GetMapping getAllVotersByUserId("/user/{id}/allVoters")			{VoterController 	Line 38}
@GetMapping getAllVotersByCampaignId("/campaign/{id}/allVoters")		{VoterController	Line 48}
@GetMapping getVoterById("/voter/{id}")					{VoterController	Line 58}

@PutMapping editUser("/editUser")					{UserController 	Line 62}
@PutMapping editCampaign("/editCampaign")				{CampaignController	Line 66}
@PutMapping editOption("/editOption")					{OptionController	Line 63}

@DeleteMapping deleteUser("/deleteUser/{id}")				{UserController 	Line 75}
@DeleteMapping deleteCampaignByUser("/deletedUser/{id}/deleteCampaigns")	{CampaignController	Line 86}
@DeleteMapping deleteCampaign("/deleteCampaign/{id}")			{CampaignController	Line 79}
@DeleteMapping deleteOptionsInCampaign("/deletedCampaign/{id}/deleteOptions")	{OptionController	Line 82}
@DeleteMapping deleteOption("/deleteOption/{id}")				{OptionController	Line 75}
@DeleteMapping deleteVoterByUser("/deletedUser/{id}/deleteVoters")		{VoterController	Line 84}
@DeleteMapping deleteVoterByCampaign("/deletedCampaign/{id}/deleteVoters")	{VoterController	Line 94}
@DeleteMapping deleteVoter("/deleteVoter/{id}")				{VoterController	Line 77}